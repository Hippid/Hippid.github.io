import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App/App';
import rootReducer from './reducers/root';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

const appWithProvider = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(appWithProvider, document.getElementById('root'));

registerServiceWorker();
