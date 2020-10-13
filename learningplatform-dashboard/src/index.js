import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import {createStore} from 'redux';
import reducer from './store/reducer';
import {Provider} from 'react-redux';

const store = createStore(reducer);

ReactDOM.render(
  
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
    
);



