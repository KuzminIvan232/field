import EncryptedStorage from "react-native-encrypted-storage";

const SESSION_STORAGE_KEY = 'user_session';

export type Session = {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
};

function isSession(value: unknown): value is Session {
    return (
        typeof value === 'object' &&
        value !== null &&
        typeof (value as Session).accessToken === 'string' &&
        typeof (value as Session).refreshToken === 'string' &&
        typeof (value as Session).expiresAt === 'number'
    );
}

export async function saveSession(session: Session): Promise<void> {
    await EncryptedStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}
export async function restoreSession(): Promise<Session> {
    const data = await EncryptedStorage.getItem(SESSION_STORAGE_KEY);

    if (!data) {
        throw new Error('Session not found');
    }

    const parsed: unknown = JSON.parse(data);

    if (!isSession(parsed)) {
        await clearSession();
        throw new Error('Invalid session format');
    }

    if (Date.now() >= parsed.expiresAt) {
        await clearSession();
        throw new Error('Session expired');
    }

    return parsed;
}

export async function clearSession(): Promise<void> {
    try {
        await EncryptedStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
    }
}