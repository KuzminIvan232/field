/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import Launch from '@navigation/screens/Launch';
import PublicStack from '@navigation/screens/PublicStack';
import PrivateStack from '@navigation/screens/PrivateStack';
import Login from '@navigation/screens/Login';
import Dashboard from '@navigation/screens/Dashboard';
import Profile from '@navigation/screens/Profile';
import { ScreenNames } from '@navigation/screenNames';

Navigation.registerComponent(ScreenNames.Launch, () => Launch);
Navigation.registerComponent(ScreenNames.PublicStack, () => PublicStack);
Navigation.registerComponent(ScreenNames.PrivateStack, () => PrivateStack);
Navigation.registerComponent(ScreenNames.Login, () => Login);
Navigation.registerComponent(ScreenNames.Dashboard, () => Dashboard);
Navigation.registerComponent(ScreenNames.Profile, () => Profile);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{ component: { name: ScreenNames.Login } }],
            },
        },
    });
});
