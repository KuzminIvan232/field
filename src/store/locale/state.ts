import { observable } from 'mobx';

export type Lang = 'en' | 'uk';

export const localeStore = observable.object({
    lang: 'en' as Lang,
});
