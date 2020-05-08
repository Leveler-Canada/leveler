import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ContributeBand from '../Header/ContributeBand';
import HomePage from '../Home';
import SignUpPage from '../SignUp';
import ContributePage from '../Contribute';
import DistributePage from '../Distribute';
import SuccessPage from '../Success';
import AboutPage from '../About';
import ResourcesPage from '../Resources';
import AddResourcePage from '../AddResource';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <ContributeBand />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.SIGNUP} component={SignUpPage} />
      <Route path={ROUTES.CONTRIBUTE} component={ContributePage} />
      <Route path={ROUTES.DISTRIBUTE} component={DistributePage} />
      <Route path={ROUTES.SUCCESS} component={SuccessPage} />
      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <Route path={ROUTES.RESOURCES} component={ResourcesPage} />
      <Route path={ROUTES.ADD_RESOURCE} component={AddResourcePage} />
    </div>
  </Router>
);
export default withAuthentication(App);
