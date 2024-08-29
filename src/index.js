import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom/client';
import 'react-app-polyfill/stable'
import 'core-js'

import App from './App';
import reportWebVitals from './reportWebVitals';
import { PermifyProvider } from "@permify/react-role";

import authReducer from './store/reducers/auth'
import siteReducer from './store/reducers/site'
import userReducer from './store/reducers/user'
import faqReducer from './store/reducers/faq'
import materialReducer from './store/reducers/material'
import categoryReducer from './store/reducers/category'
import groupReducer from './store/reducers/group'
import digitalLibraryReducer from './store/reducers/digital_library'
import dataset_metaReducer from './store/reducers/dataset_meta'
import roleReducer from './store/reducers/role'
import userRequestReducer from './store/reducers/userRequest'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  site: siteReducer,
  user: userReducer,
  faq: faqReducer,
  material: materialReducer,
  category: categoryReducer,
  group: groupReducer,
  digitalLibrary: digitalLibraryReducer,
  dataset_meta: dataset_metaReducer,
  role: roleReducer,
  userRequest: userRequestReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PermifyProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </PermifyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
