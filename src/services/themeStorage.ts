import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode } from '@store/theme/state';

const KEY = 'theme_mode';

export const saveThemeMode = (mode: ThemeMode) => AsyncStorage.setItem(KEY, mode);

export const loadThemeMode = async (): Promise<ThemeMode> => {
    const raw = await AsyncStorage.getItem(KEY);
    return raw === 'light' || raw === 'dark' || raw === 'system' ? raw : 'system';
};