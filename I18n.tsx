import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { getMessage2 } from './dictionary';

const languageState = atom({
  key: 'language',
  default: 'ja',
});

const getMessageState = selector({
  key: 'getMessage',
  get: ({ get }) => {
    const lang = get(languageState);
    return getMessage2(lang);
  },
});

type I18nContextValue = {
  lang: string;
  selectLang: (lang: string) => void;
  i18n: (message: string) => string;
};

export function useI18nContext(): I18nContextValue {
  const [lang, selectLang] = useRecoilState(languageState);
  const i18n = useRecoilValue(getMessageState);

  return {
    lang,
    selectLang,
    i18n,
  };
}
