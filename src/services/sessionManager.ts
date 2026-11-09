// =========================================================================
// STAYNEST AUTHENTICATION & SESSION MANAGEMENT SERVICE
// Implements tokenized short-lived memory state + localStorage persistence
// with automatic token verification, cross-tab sync, and expiration refresh.
// =========================================================================

export interface CurrentUser {
  role: 'student' | 'landlord' | 'admin';
  name: string;
  email: string;
  studentId?: string;
  subTitle?: string;
  avatar: string;
  profilePhoto?: string;
}

export interface AuthSession {
  token: string;
  refreshToken: string;
  user: CurrentUser;
  createdAt: number;
  expiresAt: number;
  lastVerifiedAt: number;
}

const STORAGE_KEY = 'staynest_auth_session_v2';
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours valid session window

// Short-lived in-memory cache
let inMemorySession: AuthSession | null = null;
let verificationListeners: Array<(user: CurrentUser | null) => void> = [];

/**
 * Helper to generate a token signature string
 */

function generateToken(user: CurrentUser): { token: string; refreshToken: string } {
  const payload = btoa(JSON.stringify({ email: user.email, role: user.role, ts: Date.now() }));
  return {
    token: `sn_live_${payload}_${Math.random().toString(36).substring(2, 9)}`,
    refreshToken: `sn_rf_${btoa(user.email)}_${Math.random().toString(36).substring(2, 9)}`,
  };
}

/**
 * Initializes and verifies active session on boot / page reload.
 * Extends expiration if session is valid and verified.
 */
export function verifyAndHydrateSession(): { user: CurrentUser | null; session: AuthSession | null } {
  const now = Date.now();

  // 1. Check in-memory cache first if valid
  if (inMemorySession && inMemorySession.expiresAt > now) {
    inMemorySession.lastVerifiedAt = now;
    return { user: inMemorySession.user, session: inMemorySession };
  }

  // 2. Read from localStorage
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      inMemorySession = null;
      return { user: null, session: null };
    }

    const sessionData: AuthSession = JSON.parse(raw);

    // 3. Verify token expiration
    if (!sessionData || !sessionData.token || !sessionData.user || sessionData.expiresAt <= now) {
      // Token expired or malformed
      clearSession();
      return { user: null, session: null };
    }

    // 4. Token is valid — Refresh verification timestamp and extend active session window
    sessionData.lastVerifiedAt = now;
    sessionData.expiresAt = now + TOKEN_TTL_MS; // Extend for uninterrupted usage

    // Sync back to memory and storage
    inMemorySession = sessionData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));

    return { user: sessionData.user, session: sessionData };
  } catch (err) {
    console.warn('Session verification exception:', err);
    clearSession();
    return { user: null, session: null };
  }
}

/**
 * Creates a authenticated session for the given user role
 */
export function createSession(user: CurrentUser): AuthSession {
  const now = Date.now();
  const { token, refreshToken } = generateToken(user);

  const session: AuthSession = {
    token,
    refreshToken,
    user,
    createdAt: now,
    expiresAt: now + TOKEN_TTL_MS,
    lastVerifiedAt: now,
  };

  inMemorySession = session;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.warn('Unable to persist session to localStorage:', e);
  }

  notifyListeners(user);
  return session;
}

/**
 * Clears session and logs out active user across memory and storage
 */
export function clearSession(): void {
  inMemorySession = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // Ignored
  }
  notifyListeners(null);
}

/**
 * Gets currently verified user from memory or storage
 */
export function getActiveUser(): CurrentUser | null {
  const { user } = verifyAndHydrateSession();
  return user;
}

/**
 * Subscribes to session updates (login/logout across tabs)
 */
export function subscribeSession(callback: (user: CurrentUser | null) => void): () => void {
  verificationListeners.push(callback);

  // Cross-tab synchronization via StorageEvent
  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      if (!event.newValue) {
        inMemorySession = null;
        callback(null);
      } else {
        const { user } = verifyAndHydrateSession();
        callback(user);
      }
    }
  };

  window.addEventListener('storage', handleStorageEvent);

  return () => {
    verificationListeners = verificationListeners.filter((cb) => cb !== callback);
    window.removeEventListener('storage', handleStorageEvent);
  };
}

function notifyListeners(user: CurrentUser | null) {
  verificationListeners.forEach((cb) => {
    try {
      cb(user);
    } catch (e) {
      // Ignored
    }
  });
}
