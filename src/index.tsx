import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

const rootElement: HTMLElement | null = document.getElementById('root');

ReactDOM.render(
    <App />,
  rootElement
);
