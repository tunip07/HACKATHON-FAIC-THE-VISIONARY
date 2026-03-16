import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export interface AppProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  provider?: string;
}

interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  provider: string | null;
}

export interface ProfileUpdateInput {
  fullName: string;
  phone: string;
}

const getFullNameFromAuthUser = (authUser: User) => {
  const metadata = authUser.user_metadata ?? {};

  if (typeof metadata.full_name === 'string' && metadata.full_name.trim()) {
    return metadata.full_name.trim();
  }

  if (typeof metadata.name === 'string' && metadata.name.trim()) {
    return metadata.name.trim();
  }

  const joinedName = [metadata.given_name, metadata.family_name]
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .join(' ')
    .trim();

  if (joinedName) {
    return joinedName;
  }

  return authUser.email ?? 'Người dùng';
};

const buildProfileSeed = (authUser: User) => ({
  id: authUser.id,
  email: authUser.email ?? '',
  full_name: getFullNameFromAuthUser(authUser),
  phone: typeof authUser.user_metadata?.phone === 'string' ? authUser.user_metadata.phone : '',
  avatar_url: typeof authUser.user_metadata?.avatar_url === 'string' ? authUser.user_metadata.avatar_url : '',
  provider: typeof authUser.app_metadata?.provider === 'string' ? authUser.app_metadata.provider : 'email',
});

const mapProfile = (authUser: User, row?: ProfileRow | null): AppProfile => {
  const seed = buildProfileSeed(authUser);

  return {
    id: authUser.id,
    email: row?.email || authUser.email || seed.email,
    name: row?.full_name || seed.full_name,
    phone: row?.phone || seed.phone,
    avatar: row?.avatar_url || seed.avatar_url || undefined,
    provider: row?.provider || seed.provider,
  };
};

const syncMissingProfileFields = async (authUser: User, row: ProfileRow) => {
  const seed = buildProfileSeed(authUser);
  const patch: Partial<ProfileRow> = {};

  if (authUser.email && row.email !== authUser.email) {
    patch.email = authUser.email;
  }
  if (!row.full_name && seed.full_name) {
    patch.full_name = seed.full_name;
  }
  if (!row.phone && seed.phone) {
    patch.phone = seed.phone;
  }
  if (!row.avatar_url && seed.avatar_url) {
    patch.avatar_url = seed.avatar_url;
  }
  if (!row.provider && seed.provider) {
    patch.provider = seed.provider;
  }

  if (Object.keys(patch).length === 0) {
    return row;
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(patch)
    .eq('id', authUser.id)
    .select('id, email, full_name, phone, avatar_url, provider')
    .single();

  if (error || !data) {
    return row;
  }

  return data as ProfileRow;
};

export const ensureProfile = async (authUser: User): Promise<AppProfile> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, phone, avatar_url, provider')
    .eq('id', authUser.id)
    .maybeSingle();

  if (!error && data) {
    const syncedRow = await syncMissingProfileFields(authUser, data as ProfileRow);
    return mapProfile(authUser, syncedRow);
  }

  if (error && error.code !== 'PGRST116') {
    console.warn('Could not read profiles table, falling back to auth metadata.', error);
    return mapProfile(authUser);
  }

  const seed = buildProfileSeed(authUser);
  const { data: inserted, error: insertError } = await supabase
    .from('profiles')
    .upsert(seed, { onConflict: 'id' })
    .select('id, email, full_name, phone, avatar_url, provider')
    .single();

  if (insertError) {
    console.warn('Could not create profile row, falling back to auth metadata.', insertError);
    return mapProfile(authUser);
  }

  return mapProfile(authUser, inserted as ProfileRow);
};

export const updateMyProfile = async (authUser: User, updates: ProfileUpdateInput): Promise<AppProfile> => {
  const seed = buildProfileSeed(authUser);

  const payload = {
    id: authUser.id,
    email: authUser.email ?? seed.email,
    full_name: updates.fullName.trim(),
    phone: updates.phone.trim(),
    avatar_url: seed.avatar_url,
    provider: seed.provider,
  };

  const { data, error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select('id, email, full_name, phone, avatar_url, provider')
    .single();

  if (error) {
    if (error.code === '42P01' || error.code === 'PGRST205') {
      throw new Error('Bảng profiles chưa được tạo trong Supabase. Hãy chạy file migration trước.');
    }
    throw error;
  }

  const { error: authError } = await supabase.auth.updateUser({
    data: {
      full_name: payload.full_name,
      phone: payload.phone,
    },
  });

  if (authError) {
    console.warn('Could not sync auth metadata after profile update.', authError);
  }

  return mapProfile(authUser, data as ProfileRow);
};
