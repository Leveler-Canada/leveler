import React from 'react';
import AuthUserContext from './context';

const withAuthentication = (Component) => props => {
  const UserContext = React.useContext(AuthUserContext);

  return <Component {...props} {...UserContext} />;
};
export default withAuthentication;