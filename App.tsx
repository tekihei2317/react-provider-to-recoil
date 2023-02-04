import * as React from 'react';
import { Suspense } from 'react';
import { I18nProvider, useI18nContext } from './I18n';
import { ModalProvider, useModal } from './Modal';
import './style.css';

const Page = () => {
  const [count, setCount] = React.useState(0);
  const { i18n, selectLang } = useI18nContext();
  const { showModal } = useModal();

  const handleIncrement = () => {
    showModal({
      message: i18n('カウンタを増やしますか？'),
      onConfirm() {
        setCount(count + 1);
      },
    });
  };
  const handleReset = () => {
    showModal({
      message: i18n('カウンタをリセットしますか？'),
      onConfirm() {
        setCount(0);
      },
    });
  };

  return (
    <div>
      <h1>Sample App</h1>
      <p>{i18n('サンプルアプリケーションです。')}</p>
      <p>{count}</p>
      <div>
        <button onClick={handleIncrement}>{i18n('カウンタを増やす')}</button>
        <button onClick={handleReset}>{i18n('カウンタをリセットする')}</button>
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
      <ModalProvider>
        <Page />
      </ModalProvider>
    </I18nProvider>
  );
}
