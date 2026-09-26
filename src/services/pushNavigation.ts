import { Navigation } from 'react-native-navigation';
import { showAppMessage } from '@services/flashMessage';
import {
    RemoteMessage,
    getInitialNotification,
    getMessaging,
    onMessage,
    onNotificationOpenedApp,
    setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import { ScreenNames } from '@navigation/screenNames';

function openCourseFromPush(remoteMessage: RemoteMessage | null) {
    const courseId = remoteMessage?.data?.courseId;

    if (typeof courseId !== 'string') {
        return;
    }

    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: ScreenNames.Dashboard,
                            passProps: { courseId },
                        },
                    },
                ],
            },
        },
    });
}

// State 1 — app fully closed, opened by tapping the notification (cold start).
// The push equivalent of getInitialURL() for deep links.
export function handleColdStartNotification() {
    getInitialNotification(getMessaging()).then(openCourseFromPush);
}

// State 2 — app was backgrounded (minimized, process still alive) and the
// user tapped the notification to bring it back to the foreground.
export function subscribeToNotificationOpened() {
    return onNotificationOpenedApp(getMessaging(), openCourseFromPush);
}

// State 3 — app is open (foreground). Firebase does NOT show a system
// notification by itself here, so it's surfaced manually.
export function subscribeToForegroundMessages() {
    return onMessage(getMessaging(), async remoteMessage => {
        showAppMessage({
            message: remoteMessage.notification?.title ?? 'New notification',
            description: remoteMessage.notification?.body,
            type: 'info',
        });
        openCourseFromPush(remoteMessage);
    });
}

// State 4 — app backgrounded or fully killed and a message arrives (no tap
// yet). Must be registered in index.js, before any screen is registered.
export function registerBackgroundMessageHandler() {
    setBackgroundMessageHandler(getMessaging(), async remoteMessage => {
        console.log('[push] background message', remoteMessage);
    });
}
