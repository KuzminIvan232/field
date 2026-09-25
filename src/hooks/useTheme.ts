import { useColorScheme } from 'react-native';
import { themeStore } from '@store/theme/state';
import { lightColors, darkColors, Colors } from '@utils/colors';

export function useTheme(): { colors: Colors; isDark: boolean } {
    const system = useColorScheme();
    const mode = themeStore.mode;

    const resolved = mode === 'system' ? (system ?? 'light') : mode;
    const isDark = resolved === 'dark';

    return { colors: isDark ? darkColors : lightColors, isDark };
}