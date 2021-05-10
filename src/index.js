import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';

import App from './routes/App';
import store from './store';

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'));