import { useState, useEffect } from 'react';

/**
 * 简单的翻译钩子函数
 * @param {Object} translations - 翻译对象
 * @returns {Object} 翻译函数和当前语言
 */
export function useTranslation(translations = {}) {
  const [language, setLanguage] = useState('zh');
  const [translatedText, setTranslatedText] = useState({});

  useEffect(() => {
    // 根据当前语言更新翻译文本
    const texts = {};
    Object.keys(translations).forEach(key => {
      texts[key] = translations[key][language] || translations[key]['zh'] || key;
    });
    setTranslatedText(texts);
  }, [language, translations]);

  const t = (key) => {
    return translatedText[key] || key;
  };

  return { t, language, setLanguage };
}
