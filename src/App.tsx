import React, { useState, createContext } from "react";
import "./App.css";

import { PresentationEditor } from "./components/PresentationEditor/PresentationEditor";

import { getL18nObject, l18nType } from "./l18n/l18n";

import { Provider } from "react-redux";
import { store } from "./redux/store";

export type LocaleContextType = {
  locale: l18nType,
  changeLocale: React.Dispatch<React.SetStateAction<l18nType>> | undefined
}

const initialLocaleContext: LocaleContextType = {
  locale: getL18nObject('ru_RU'),
  changeLocale: undefined
}

export const LocaleContext = createContext(initialLocaleContext);

function App() {
  const [locale, changeLocale] = useState(getL18nObject('ru_RU'));

  return (
    <Provider store={store} >
      <LocaleContext.Provider value={{ locale, changeLocale }}>
        <PresentationEditor />
      </LocaleContext.Provider>
    </Provider>
  );
}

export default App;
