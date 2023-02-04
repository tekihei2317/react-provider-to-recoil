import * as React from 'react';
import { getMessage } from './dictionary';

type I18nContextValue = {
  lang: string;
  selectLang: (lang: string) => void;
  i18n: (message: string) => string;
};

const I18nContext = React.createContext<I18nContextValue | undefined>(
  undefined
);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, selectLang] = React.useReducer((prevLang, lang) => {
    if (lang === 'ja' || lang === 'en') return lang;
    return prevLang;
  }, 'ja');

  const i18n = (message: string) => {
    return getMessage(message, lang);
  };

  return (
    <I18nContext.Provider value={{ lang, selectLang, i18n }}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18nContext(): I18nContextValue {
  const value = React.useContext(I18nContext);
  if (value === undefined) {
    throw new Error('I18n context is not provided.');
  }
  return value;
}
