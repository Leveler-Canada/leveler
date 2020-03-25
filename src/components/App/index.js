import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ContributeBand from '../Header/ContributeBand'
import HomePage from '../Home';
import SignUpPage from '../SignUp';
import ContributePage from '../Contribute/'
import DistributePage from '../Distribute'
import SuccessPage from '../Success'
import AboutPage from '../About'
import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <ContributeBand/> 
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.SIGNUP} component={SignUpPage} />
      <Route path={ROUTES.CONTRIBUTE} component={ContributePage} />
      <Route path={ROUTES.DISTRIBUTE} component={DistributePage} />
      <Route path={ROUTES.SUCCESS} component={SuccessPage} />
      <Route path={ROUTES.ABOUT} component={AboutPage} />
    </div>
  </Router>
);
export default App;