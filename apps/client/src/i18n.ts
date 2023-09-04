import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    fallbackLng: 'en',
    load: 'languageOnly', // load 'en' instead of 'en-US'
    react: {
      useSuspense: true,
    },
    detection: {
      order: ['queryString', 'cookie'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

z.setErrorMap(zodI18nMap);

export default i18n;
