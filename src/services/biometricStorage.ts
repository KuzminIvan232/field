import EncryptedStorage from 'react-native-encrypted-storage';

const ENABLED_KEY = 'biometric_enabled';
const PUBLIC_KEY_KEY = 'biometric_public_key';

export const saveBiometricsEnabled = async (enabled: boolean, publicKey?: string): Promise<void> => {
    if (enabled) {
        await EncryptedStorage.setItem(ENABLED_KEY, 'true');
        if (publicKey) {
            await EncryptedStorage.setItem(PUBLIC_KEY_KEY, publicKey);
        }
    } else {
        await EncryptedStorage.removeItem(ENABLED_KEY);
        await EncryptedStorage.removeItem(PUBLIC_KEY_KEY);
    }
};

export const loadBiometricsEnabled = async (): Promise<boolean> => {
    const raw = await EncryptedStorage.getItem(ENABLED_KEY);
    return raw === 'true';
};
