import * as React from 'react';
import { I18nProvider, useI18nContext } from './I18n';
import './style.css';

const Page = () => {
  const [count, setCount] = React.useState(0);
  const { i18n, selectLang } = useI18nContext();

  return (
    <div>
      <h1>Sample App</h1>
      <p>{i18n('サンプルアプリケーションです。')}</p>
      <p>{count}</p>
      <div>
        <button onClick={() => setCount(count + 1)}>
          {i18n('カウンタを増やす')}
        </button>
        <button onClick={() => setCount(0)}>
          {i18n('カウンタをリセットする')}
        </button>
      </div>
      <div style={{ marginTop: '16px' }}>
        <select onChange={(e) => selectLang(e.currentTarget.value)}>
          <option value="ja">🇯🇵{i18n('日本語')}</option>
          <option value="en">🇬🇧{i18n('英語')}</option>
        </select>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  );
}
