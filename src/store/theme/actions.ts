import { action } from 'mobx';
import { themeStore, ThemeMode } from './state';
import { saveThemeMode } from '@services/themeStorage';

export const setThemeMode = action((mode: ThemeMode) => {
    themeStore.mode = mode;
    saveThemeMode(mode);
});