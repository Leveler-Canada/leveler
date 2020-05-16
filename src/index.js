import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import { AuthUserContextProvider } from './components/Session';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <AuthUserContextProvider>
      <App />
    </AuthUserContextProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();