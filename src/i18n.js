import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

const defaultLanguage = 'en';

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule) // if not using I18nextProvider
  .init({
    fallbackLng: defaultLanguage,
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
    },
  });

// eslint-disable-next-line
i18n.addResourceBundle(defaultLanguage, 'translation', require(`./resourses/${defaultLanguage}`));

export default i18n;
