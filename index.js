/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import Launch from '@navigation/screens/Launch';
import PublicStack from '@navigation/screens/PublicStack';
import PrivateStack from '@navigation/screens/PrivateStack';
import { ScreenNames } from '@navigation/screenNames';

Navigation.registerComponent(ScreenNames.Launch, () => Launch);
Navigation.registerComponent(ScreenNames.PublicStack, () => PublicStack);
Navigation.registerComponent(ScreenNames.PrivateStack, () => PrivateStack);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: { component: { name: ScreenNames.Launch } },
    });
});
