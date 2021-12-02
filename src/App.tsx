import React, { useContext, useState } from "react";
import "./App.css";
import { PresentationEditor } from "./components/PresentationEditor/PresentationEditor";
import { getL18nObject } from "./l18n/l18n";

const locale = getL18nObject('ru_RU');
export const LocaleContext = React.createContext(locale);

function App() {
  return (
    <LocaleContext.Provider value={locale}>
      <PresentationEditor />
    </LocaleContext.Provider>
  );
}

export default App;
