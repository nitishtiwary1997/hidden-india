// Authentication & User Session Manager
export interface UserSession {
  id: string;
  name: string;
  email: string;
  image: string;
  role: 'USER' | 'ADMIN';
}

const STORAGE_KEY = 'hiddenindia_user_session';

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
}

export function clearStoredSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
