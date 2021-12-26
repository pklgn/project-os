import React, { useState, createContext } from "react";
import "./App.css";

import { PresentationEditor } from "./components/PresentationEditor/PresentationEditor";

import { getL18nObject, l18nType } from "./l18n/l18n";

import { bindActionCreators } from "redux";
import { keepModelAction } from "./redux/action-creators/historyActionCreators";
import { useDispatch } from "react-redux";

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

  const dispatch = useDispatch();
  const dispatchKeepAppModelAction = bindActionCreators(keepModelAction, dispatch);

  dispatchKeepAppModelAction();
  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      <PresentationEditor />
    </LocaleContext.Provider>
  );
}

export default App;
