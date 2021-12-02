import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';

const rootElement: HTMLElement | null = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
