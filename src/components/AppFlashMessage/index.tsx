import FlashMessage from 'react-native-flash-message';
import { registerActiveFlashMessage } from '@services/flashMessage';

// Each react-native-navigation screen mounts its own instance of this —
// see @services/flashMessage for why the library's own singleton doesn't
// work across independently-mounted screens.
export default function AppFlashMessage() {
    return (
        <FlashMessage
            position="top"
            canRegisterAsDefault={false}
            ref={registerActiveFlashMessage}
        />
    );
}
