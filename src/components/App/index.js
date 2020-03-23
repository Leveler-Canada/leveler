import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import HomePage from '../Home';
import SignUpPage from '../SignUp';
import DistributePage from '../Distribute'
import SuccessPage from '../Success'
import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <hr />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.SIGNUP} component={SignUpPage} />
      <Route path={ROUTES.DISTRIBUTE} component={DistributePage} />
      <Route path={ROUTES.SUCCESS} component={SuccessPage} />
    </div>
  </Router>
);
export default App;