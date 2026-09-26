import { MessageOptions } from 'react-native-flash-message';

type FlashMessageInstance = {
    showMessage: (options: MessageOptions) => void;
};

// react-native-flash-message's own default-instance registration only claims
// the FIRST instance ever mounted and keeps it forever (until it unmounts) —
// wrong for react-native-navigation, where every screen mounts its own
// <FlashMessage>. We track "whichever screen's instance mounted most
// recently" ourselves instead, via canRegisterAsDefault={false} + a ref.
let activeInstance: FlashMessageInstance | null = null;

export function registerActiveFlashMessage(instance: FlashMessageInstance | null) {
    if (instance) {
        activeInstance = instance;
    }
}

export function showAppMessage(options: MessageOptions) {
    activeInstance?.showMessage(options);
}
