import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ToastProvider } from 'react-toast-notifications';
import 'bootstrap/dist/css/bootstrap.min.css';

import Rotas from './utils/rotas';

ReactDOM.render(
    <React.StrictMode>
        <ToastProvider>
            <Rotas/>
        </ToastProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
