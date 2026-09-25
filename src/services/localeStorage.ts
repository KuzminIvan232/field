import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lang } from '@store/locale/state';

const KEY = 'lang';

const detectDeviceLang = (): Lang => {
    const deviceLang = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0];
    return deviceLang === 'uk' ? 'uk' : 'en';
};

export const saveLang = (lang: Lang) => AsyncStorage.setItem(KEY, lang);

export const loadLang = async (): Promise<Lang> => {
    const raw = await AsyncStorage.getItem(KEY);
    return raw === 'en' || raw === 'uk' ? raw : detectDeviceLang();
};
