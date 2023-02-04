const messages = {
  'サンプルアプリケーションです。': {
    en: 'This is a sample applicfation.',
  },
  カウンタを増やす: {
    en: 'Increment counter',
  },
  カウンタをリセットする: {
    en: 'Reset counter',
  },
  'カウンタを増やしますか？': {
    en: 'Are you sure you want to increment the counter?',
  },
  'カウンタをリセットしますか？': {
    en: 'Are you sure you want to reset the counter?',
  },
  キャンセル: {
    en: 'Cancel',
  },
  了解: {
    en: 'Confirm',
  },
  日本語: {
    en: 'Japanese',
  },
  英語: {
    en: 'English',
  },
};

export function getMessage(message: string, lang: string): string {
  return messages[message]?.[lang] ?? message;
}

export const getMessage2 =
  (lang: string) =>
  (message: string): string => {
    return messages[message]?.[lang] ?? message;
  };
