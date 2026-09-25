import { observable } from 'mobx';

export type ThemeMode = 'light' | 'dark' | 'system';

export const themeStore = observable.object({
    mode: 'system' as ThemeMode,
});

