/**
 * @format
 */

import {
    handleColdStartNotification,
    registerBackgroundMessageHandler,
    subscribeToForegroundMessages,
    subscribeToNotificationOpened,
} from '@services/pushNavigation';

import { Navigation } from 'react-native-navigation';
import Launch from '@navigation/screens/Launch';
import Login from '@navigation/screens/Login';
import Dashboard from '@navigation/screens/Dashboard';
import Profile from '@navigation/screens/Profile';
import Scanner from '@navigation/screens/Scanner';
import InviteFriend from '@navigation/screens/InviteFriend';
import DeviceInfo from '@navigation/screens/DeviceInfo';
import WebViewScreen from '@navigation/screens/WebViewScreen';
import CourseDetails from '@navigation/screens/CourseDetails';
import Courses from '@navigation/screens/Courses';
import { ScreenNames } from '@navigation/screenNames';

Navigation.registerComponent(ScreenNames.Launch, () => Launch);
Navigation.registerComponent(ScreenNames.Login, () => Login);
Navigation.registerComponent(ScreenNames.Dashboard, () => Dashboard);
Navigation.registerComponent(ScreenNames.Profile, () => Profile);
Navigation.registerComponent(ScreenNames.Scanner, () => Scanner);
Navigation.registerComponent(ScreenNames.InviteFriend, () => InviteFriend);
Navigation.registerComponent(ScreenNames.DeviceInfo, () => DeviceInfo);
Navigation.registerComponent(ScreenNames.WebView, () => WebViewScreen);
Navigation.registerComponent(ScreenNames.CourseDetails, () => CourseDetails);
Navigation.registerComponent(ScreenNames.Courses, () => Courses);

Navigation.events().registerAppLaunchedListener(() => {
    // Deferred until the native side confirms it's ready — calling into the
    // Firebase native module before that (e.g. at top-level module eval)
    // deadlocks app startup on iOS bridgeless.
    registerBackgroundMessageHandler();
    subscribeToNotificationOpened();
    subscribeToForegroundMessages();

    Navigation.setRoot({
        root: { component: { name: ScreenNames.Launch } },
    });

    // App was fully closed and opened by tapping a notification (cold start).
    handleColdStartNotification();
});
