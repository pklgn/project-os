import React, { useState, createContext, useEffect } from 'react';
import styles from './App.module.css';

import { PresentationEditor } from './components/PresentationEditor/PresentationEditor';
import { PresentationViewer } from './components/PresentationViewer/PresentationViewer';

import { getL18nObject, l18nType } from './l18n/l18n';

import { Provider, useDispatch } from 'react-redux';
import { store } from './app_model/redux_model/store';
import { getSlideElementType } from './app_model/model/utils/tools';
import { setChosenElementsType } from './app_model/redux_model/actions_view_model/action_creators/chosen_elements_action_creator';
import { bindActionCreators } from 'redux';

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
