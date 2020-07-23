import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import enTranslations from './locale/en.json';

const multiLanguageResource = {
  en: {
    translation: enTranslations,
  },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: multiLanguageResource,
  });

export default i18next;
