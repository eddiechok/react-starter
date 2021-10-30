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
    request: function (_, url, payload, callback) {
      axios
        .get(url)
        .then((res: any) => {
          const translationObj = {
            status: res.status,
            data: JSON.stringify(res.data)
          };
          callback(null, translationObj);
        })
        .catch(() => {
          callback(null, {
            status: 404,
            data: ''
          });
        });
      // }
    },
    //parse data before it has been sent by addPath
    parsePayload: function (ns, key) {
      return {
        key: ns + '.' + key
      };
    }
  },
  load: 'languageOnly',
  keySeparator: false, // we do not use keys in form messages.welcome
  saveMissing: true,
  saveMissingTo: 'current',
  missingKeyHandler: function (_, ns, key) {
    axios.post('/translation/add', { key: ns + '.' + key });
  },
  // debug: true,
  defaultNS: 'common',
  ns: ['common'],
  detection: {
    order: [
      'localStorage',
      'htmlTag',
      'querystring',
      'cookie',
      'navigator',
      'path',
      'subdomain'
    ]
  },
  interpolation: {
    // react already saves from xss
    escapeValue: false
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(i18nextOptions);

export default i18n;
