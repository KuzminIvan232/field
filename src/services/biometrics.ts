import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: false });

const SIGN_IN_PAYLOAD = 'aurora-sign-in';

export type BiometricFailureReason =
    | 'not_available'
    | 'not_enrolled'
    | 'user_cancelled'
    | 'lockout'
    | 'unknown';

export const BIOMETRIC_FAILURE_MESSAGES: Record<BiometricFailureReason, string> = {
    not_available: 'Biometrics are not available on this device',
    not_enrolled: 'Biometrics are not set up in your device settings',
    user_cancelled: 'Biometric authentication was cancelled',
    lockout: 'Too many failed attempts. Please try again later',
    unknown: 'Failed to verify biometrics',
};

export class BiometricError extends Error {
    reason: BiometricFailureReason;

    constructor(reason: BiometricFailureReason) {
        super(BIOMETRIC_FAILURE_MESSAGES[reason]);
        this.reason = reason;
    }
}

const classifyError = (error?: string): BiometricFailureReason => {
    const normalized = (error ?? '').toLowerCase();

    if (normalized.includes('lockout')) return 'lockout';
    if (normalized.includes('cancel')) return 'user_cancelled';
    if (normalized.includes('enroll') || normalized.includes('not configured')) return 'not_enrolled';

    return 'unknown';
};

export const enableBiometrics = async (): Promise<string> => {
    const { available, error } = await rnBiometrics.isSensorAvailable();

    if (!available) {
        throw new BiometricError(classifyError(error) === 'unknown' ? 'not_available' : classifyError(error));
    }

    const { publicKey } = await rnBiometrics.createKeys();
    return publicKey;
};

export const disableBiometrics = () => rnBiometrics.deleteKeys();

export const requireBiometricSignature = async (): Promise<void> => {
    const { success, error } = await rnBiometrics.createSignature({
        promptMessage: 'Вхід в Aurora',
        payload: SIGN_IN_PAYLOAD,
    });

    if (!success) {
        throw new BiometricError(classifyError(error));
    }
};
