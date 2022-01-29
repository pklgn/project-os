import ru_RU from './localizations/ru_RU.json';
import en_EN from './localizations/en_EN.json';

export type l18nLocale = 'ru_RU' | 'en_EN';

export type l18nType = {
    localization: typeof ru_RU | typeof en_EN;
    currLocale: l18nLocale;
};

export function getL18nObject(key: l18nLocale): l18nType {
    const localizationFile: typeof ru_RU | typeof en_EN = key === 'ru_RU' ? ru_RU : en_EN;

    return {
        localization: localizationFile,
        currLocale: key,
    };
}
