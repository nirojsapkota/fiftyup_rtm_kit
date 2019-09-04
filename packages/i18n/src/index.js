import React from 'react';

const LocaleContext = React.createContext();

export const LocaleProvider = ({ keys, children }) => {
  return (
    <LocaleContext.Provider value={keys}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = ({ key }) => {
  const ctx = React.useContext(LocaleContext);
  const language = window.navigator.language.split('-')[0];
  if (ctx) {
    return { [key]: ctx[language][key] };
  } else {
    throw new Error(
      "No context keys found, be sure you're calling this function from inside a LocaleProvider"
    );
  }
};
