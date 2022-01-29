import React, { useState, createContext } from 'react';
import styles from './App.module.css';

import { PresentationEditor } from './components/PresentationEditor/PresentationEditor';
import { PresentationViewer } from './components/PresentationViewer/PresentationViewer';

import { getL18nObject, l18nType } from './i18n/i18n';

import { Provider } from 'react-redux';
import { store } from './app_model/redux_model/store';
export type LocaleContextType = {
    locale: l18nType;
    changeLocale: React.Dispatch<React.SetStateAction<l18nType>> | undefined;
};

const initialLocaleContext: LocaleContextType = {
    locale: getL18nObject('ru_RU'),
    changeLocale: undefined,
};

export const LocaleContext = createContext(initialLocaleContext);

function App() {
    const [locale, changeLocale] = useState(getL18nObject('ru_RU'));

    return (
        <Provider store={store}>
            <LocaleContext.Provider value={{ locale, changeLocale }}>
                <div className={styles.app}>
                    <PresentationEditor />
                    <PresentationViewer />
                </div>
            </LocaleContext.Provider>
        </Provider>
    );
}

export default App;
