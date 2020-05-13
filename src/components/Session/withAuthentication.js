import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = (Component) => withFirebase(props => {
  const UserContext = React.useContext(AuthUserContext);

  return <Component {...props} {...UserContext} />;
});
export default withAuthentication;