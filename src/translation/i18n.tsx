import axios from 'axios';
import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const i18nextOptions: InitOptions = {
  fallbackLng: false,
  backend: {
    loadPath: function (lng, ns) {
      return `/locales/${lng}/${ns}.json`;
    },
    addPath: '/translation/add',
    request: function (_, url, payload, callback) {
      if (url === '/translation/add') {
        axios.post('/translation/add', payload);
      } else {
        axios
          .get(url)
          .then((res: any) => {
            // return JSON stringify data with no error
            const translationObj = {
              status: res.status,
              data: JSON.stringify(res.data)
            };
            callback(null, translationObj);
          })
          .catch(() => {
            // return empty data
            callback(null, {
              status: 404,
              data: ''
            });
          });
      }
    },
    //parse data before it has been sent by addPath
    parsePayload: function (ns, key) {
      return {
        key: ns + '.' + key
      };
    }
  },
  // load: 'languageOnly',
  keySeparator: false, // we do not use keys in form messages.welcome
  saveMissing: true,
  // debug: true,
  defaultNS: 'common',
  ns: ['common'],
  detection: {
    // get user's lang based on localStorage first then from htmlTag
    order: [
      'localStorage',
      'htmlTag',
      'querystring',
      'cookie',
      'navigator',
      'path',
      'subdomain'
    ]
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(i18nextOptions);

export default i18n;
