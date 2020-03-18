import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import HomePage from '../Home';
import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <hr />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      {/* <Route path={ROUTES.SIGNUP} component={} />
      <Route path={ROUTES.DISTRIBUTE} component={} /> */}
    </div>
  </Router>
);
export default App;