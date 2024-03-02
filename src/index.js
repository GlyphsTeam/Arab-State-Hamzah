import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import  store  from './redux/slices/login';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import {themeGeorgia, themeOther} from './theme/theme'
const themeF = process.env.REACT_APP_City === 'GA' ? themeGeorgia : themeOther;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeF}>

    <Provider store={store}>
      <App />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
