import { restoreSession, clearSession, Session } from '@services/session';
import { useEffect, useState } from 'react';
import { Navigation } from 'react-native-navigation';
import { ScreenNames } from '@navigation/screenNames';
import { showAppMessage } from '@services/flashMessage';
import { loadThemeMode } from '@services/themeStorage';
import { setThemeMode } from '@store/theme/actions';
import { loadLang } from '@services/localeStorage';
import { setLang } from '@store/locale/actions';
import { initLocalization } from '@localization/index';
import { loadBiometricsEnabled } from '@services/biometricStorage';
import { requireBiometricSignature, BiometricError } from '@services/biometrics';

export function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function initSession() {
            setThemeMode(await loadThemeMode());

            const lang = await loadLang();
            await initLocalization(lang);
            setLang(lang);

            try {
                const restored = await restoreSession();

                if (await loadBiometricsEnabled()) {
                    try {
                        await requireBiometricSignature();
                    } catch (error) {
                        await clearSession();
                        setSession(null);
                        await Navigation.setRoot({
                            root: {
                                stack: {
                                    children: [{ component: { name: ScreenNames.Login } }],
                                },
                            },
                        });
                        showAppMessage({
                            message: 'Biometrics',
                            description: error instanceof BiometricError
                                ? error.message
                                : 'Failed to verify biometrics',
                            type: 'warning',
                        });
                        return;
                    }
                }

                setSession(restored);
                await Navigation.setRoot({
                    root: {
                        bottomTabs: {
                            children: [
                                {
                                    stack: {
                                        children: [{ component: { name: ScreenNames.Dashboard } }],
                                        options: { bottomTab: { text: 'Dashboard' } },
                                    },
                                },
                                {
                                    stack: {
                                        children: [
                                            {
                                                component: {
                                                    name: ScreenNames.Profile,
                                                    passProps: { userId: restored.userId },
                                                },
                                            },
                                        ],
                                        options: { bottomTab: { text: 'Profile' } },
                                    },
                                },
                            ],
                        },
                    },
                });
            } catch {
                await clearSession();
                setSession(null);
                await Navigation.setRoot({
                    root: {
                        stack: {
                            children: [{ component: { name: ScreenNames.Login } }],
                        },
                    },
                });
                showAppMessage({
                    message: 'Access Error',
                    description: 'Session expired, login again',
                    type: 'warning',
                });
            } finally {
                setIsLoading(false);
            }
        }

        initSession();
    }, [])

    return { session, isLoading };
}
