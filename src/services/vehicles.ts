import { supabase } from './supabase';

export interface VehicleRecord {
  id: string;
  userId: string;
  vehicleName: string;
  licensePlate: string;
  licensePlateNormalized: string;
  status: 'active' | 'inactive';
  facePhotoUrl?: string;
  facePhotoPath?: string;
  createdAt: string;
  updatedAt: string;
}

interface VehicleRow {
  id: string;
  user_id: string;
  vehicle_name: string;
  license_plate: string;
  license_plate_normalized?: string | null;
  status: 'active' | 'inactive';
  face_photo_url: string | null;
  face_photo_path: string | null;
  created_at: string;
  updated_at: string;
}

interface ExistingVehicleRow {
  id: string;
  license_plate: string;
}

export interface CreateVehicleInput {
  userId: string;
  vehicleName: string;
  licensePlate: string;
  faceMedia?: Blob | null;
}

const FACE_PHOTO_BUCKET = 'face-photo';

export const normalizeLicensePlate = (value: string) =>
  value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .trim();

const mapVehicle = (row: VehicleRow): VehicleRecord => ({
  id: row.id,
  userId: row.user_id,
  vehicleName: row.vehicle_name,
  licensePlate: row.license_plate,
  licensePlateNormalized: normalizeLicensePlate(row.license_plate_normalized ?? row.license_plate),
  status: row.status,
  facePhotoUrl: row.face_photo_url ?? undefined,
  facePhotoPath: row.face_photo_path ?? undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapVehicleError = (error: { code?: string; message?: string }) => {
  if (error.code === '42P01' || error.code === 'PGRST205') {
    return 'Bảng vehicles chưa được tạo trong Supabase. Hãy chạy file migration trước.';
  }
  if (error.code === '23505') {
    return 'Biển số xe này đã tồn tại trong hệ thống.';
  }
  return error.message || 'Không thể xử lý dữ liệu xe lúc này.';
};

const guessVehicleMediaExtension = (faceMedia: Blob) => {
  const mimeType = faceMedia.type.toLowerCase();

  if (mimeType.includes('mp4')) {
    return 'mp4';
  }
  if (mimeType.includes('webm')) {
    return 'webm';
  }
  if (mimeType.includes('mov')) {
    return 'mov';
  }
  if (mimeType.includes('png')) {
    return 'png';
  }
  if (mimeType.includes('webp')) {
    return 'webp';
  }

  return 'jpg';
};

const uploadVehicleFaceMedia = async (userId: string, faceMedia: Blob) => {
  const extension = guessVehicleMediaExtension(faceMedia);
  const filePath = `${userId}/${Date.now()}.${extension}`;
  const contentType = faceMedia.type || 'application/octet-stream';
  const { data, error } = await supabase.storage
    .from(FACE_PHOTO_BUCKET)
    .upload(filePath, faceMedia, {
      contentType,
      upsert: true,
    });

  if (error || !data) {
    throw new Error(
      'Không thể tải video khuôn mặt lên storage. Hãy kiểm tra bucket face-photo và policy upload.',
    );
  }

  const { data: publicUrlData } = supabase.storage.from(FACE_PHOTO_BUCKET).getPublicUrl(data.path);

  return {
    facePhotoPath: data.path,
    facePhotoUrl: publicUrlData.publicUrl,
  };
};

export const listMyVehicles = async (userId: string): Promise<VehicleRecord[]> => {
  const { data, error } = await supabase
    .from('vehicles')
    .select('id, user_id, vehicle_name, license_plate, status, face_photo_url, face_photo_path, created_at, updated_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(mapVehicleError(error));
  }

  return (data as VehicleRow[] | null)?.map(mapVehicle) ?? [];
};

export const createVehicle = async (input: CreateVehicleInput): Promise<VehicleRecord> => {
  const vehicleName = input.vehicleName.trim() || 'Xe của tôi';
  const licensePlate = input.licensePlate.trim().toUpperCase();
  const licensePlateNormalized = normalizeLicensePlate(licensePlate);

  if (!licensePlateNormalized) {
    throw new Error('Biển số xe không hợp lệ.');
  }

  const { data: existingVehicles, error: duplicateError } = await supabase
    .from('vehicles')
    .select('id, license_plate')
    .eq('user_id', input.userId);

  if (duplicateError && duplicateError.code !== '42P01') {
    throw new Error(mapVehicleError(duplicateError));
  }

  const duplicateVehicle = (existingVehicles as ExistingVehicleRow[] | null)?.find(
    (vehicle) => normalizeLicensePlate(vehicle.license_plate) === licensePlateNormalized,
  );

  if (duplicateVehicle) {
    throw new Error('Bạn đã đăng ký biển số xe này rồi.');
  }

  let facePhotoPath: string | null = null;
  let facePhotoUrl: string | null = null;

  if (input.faceMedia) {
    const uploadResult = await uploadVehicleFaceMedia(input.userId, input.faceMedia);
    facePhotoPath = uploadResult.facePhotoPath;
    facePhotoUrl = uploadResult.facePhotoUrl;
  }

  const { data, error } = await supabase
    .from('vehicles')
    .insert({
      user_id: input.userId,
      vehicle_name: vehicleName,
      license_plate: licensePlate,
      status: 'active',
      face_photo_path: facePhotoPath,
      face_photo_url: facePhotoUrl,
    })
    .select('id, user_id, vehicle_name, license_plate, status, face_photo_url, face_photo_path, created_at, updated_at')
    .single();

  if (error || !data) {
    throw new Error(mapVehicleError(error || {}));
  }

  return mapVehicle(data as VehicleRow);
};
