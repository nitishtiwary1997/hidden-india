// Authentication & User Session Manager
export interface UserSession {
  id: string;
  name: string;
  email: string;
  image: string;
  role: 'USER' | 'ADMIN';
}

const STORAGE_KEY = 'hiddenindia_user_session';

// List of authorized Admin Email IDs
export const ADMIN_EMAILS = [
  'nitish.tiwary1995@gmail.com',
  'nitish.tiwary1997@gmail.com',
  'nitishtiwary1997@gmail.com',
  ...(process.env.NEXT_PUBLIC_ADMIN_EMAIL ? [process.env.NEXT_PUBLIC_ADMIN_EMAIL] : []),
];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return ADMIN_EMAILS.some((adminEmail) => adminEmail.trim().toLowerCase() === normalized);
}

export function isUserAdmin(session: UserSession | null): boolean {
  if (!session) return false;
  return session.role === 'ADMIN' && isAdminEmail(session.email);
}

export function getStoredSession(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setStoredSession(session: UserSession): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new Event('auth-session-change'));
}

export function clearStoredSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new Event('auth-session-change'));
}
