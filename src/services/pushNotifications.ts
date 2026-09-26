import { Platform } from 'react-native';
import { checkNotifications, requestNotifications, RESULTS } from 'react-native-permissions';
import { AuthorizationStatus, getMessaging, getToken, requestPermission } from '@react-native-firebase/messaging';

export async function requestNotificationPermission(): Promise<boolean> {
    // Android 13+ needs the runtime POST_NOTIFICATIONS permission; on older
    // Android versions it's unavailable (not applicable) and always allowed.
    // messaging().requestPermission() alone is a no-op on Android — it always
    // resolves AUTHORIZED there without actually asking the OS.
    if (Platform.OS === 'android') {
        const { status } = await checkNotifications();

        if (status === RESULTS.GRANTED || status === RESULTS.UNAVAILABLE) {
            return true;
        }

        const { status: requested } = await requestNotifications([]);
        return requested === RESULTS.GRANTED;
    }

    // iOS notification permission isn't part of the generic permission system —
    // it goes through Firebase Messaging's own request instead.
    const authStatus = await requestPermission(getMessaging());
    return (
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL
    );
}

export async function getDeviceToken(): Promise<string> {
    return getToken(getMessaging());
}
