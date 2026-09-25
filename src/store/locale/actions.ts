import { action } from 'mobx';
import i18n from 'i18next';
import { localeStore, Lang } from './state';
import { saveLang } from '@services/localeStorage';

export const setLang = action((lang: Lang) => {
    localeStore.lang = lang;
    i18n.changeLanguage(lang);
    saveLang(lang);
});
