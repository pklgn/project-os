import ru_RU from './localizations/ru_RU.json';
import en_EN from './localizations/en_EN.json';

type l18nLocale = 'ru_RU' | 'en_EN'

export function getL18nObject(key: l18nLocale) {
    const localizationFile = (key === 'ru_RU')
        ? ru_RU
        : en_EN;

    return {
        localization: localizationFile,
        currLocale: key
    };
}