const PENDING_SIGNUP_EMAIL_KEY = 'pending_signup_email';
const RECOVERY_EMAIL_KEY = 'recovery_email';
const RECOVERY_VERIFIED_KEY = 'recovery_verified';

const canUseSessionStorage = () => typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';

const getFromStorage = (key: string) => {
  if (!canUseSessionStorage()) return '';
  return window.sessionStorage.getItem(key) ?? '';
};

const setInStorage = (key: string, value: string) => {
  if (!canUseSessionStorage()) return;
  window.sessionStorage.setItem(key, value);
};

const removeFromStorage = (key: string) => {
  if (!canUseSessionStorage()) return;
  window.sessionStorage.removeItem(key);
};

export const getAuthRedirectUrl = (path: string) => {
  if (typeof window === 'undefined') return path;
  return new URL(path, window.location.origin).toString();
};

export const getPendingSignupEmail = () => getFromStorage(PENDING_SIGNUP_EMAIL_KEY);

export const setPendingSignupEmail = (email: string) => {
  setInStorage(PENDING_SIGNUP_EMAIL_KEY, email);
};

export const clearPendingSignupEmail = () => {
  removeFromStorage(PENDING_SIGNUP_EMAIL_KEY);
};

export const getRecoveryEmail = () => getFromStorage(RECOVERY_EMAIL_KEY);

export const setRecoveryEmail = (email: string) => {
  setInStorage(RECOVERY_EMAIL_KEY, email);
};

export const clearRecoveryEmail = () => {
  removeFromStorage(RECOVERY_EMAIL_KEY);
};

export const isRecoveryVerified = () => getFromStorage(RECOVERY_VERIFIED_KEY) === 'true';

export const markRecoveryVerified = () => {
  setInStorage(RECOVERY_VERIFIED_KEY, 'true');
};

export const clearRecoveryVerified = () => {
  removeFromStorage(RECOVERY_VERIFIED_KEY);
};

export const clearRecoveryFlow = () => {
  clearRecoveryEmail();
  clearRecoveryVerified();
};
