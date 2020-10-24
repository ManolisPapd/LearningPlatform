import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import {createStore, combineReducers} from 'redux';
import tokenReducer from './store/reducers/token';
import modalReducer from './store/reducers/modal';
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
  token: tokenReducer,
  modal: modalReducer
});
const store = createStore(rootReducer);

ReactDOM.render(
  
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
    
);



