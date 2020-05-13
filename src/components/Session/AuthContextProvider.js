import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const getUserData = async (authUser) => {
  const { userCollection } = this.props.firebase;
  try {
    const doc = await userCollection.doc(authUser.uid).get()
    const user = doc.data()

    return user;
  } catch (e) {
    console.log(e.message)
  }
};

const registerAuthChangeListener = firebase => {
  const { auth } = firebase;

  const listener = auth.onAuthStateChanged(
    async (authUser) => {
      const userData = authUser ? await this.getUserData(authUser) : null; 
      this.setState({ authUser, userData});
    }
  );

  React.useEffect(registerAuthChangeListener(firebase));

  return listener
};

const AuthContextProvider = withFirebase(({ children, firebase }) => {
  const [userData, setUserData] = React.useState(null);
  const [authChangeListener, setAuthChangeListener] = React.useState(null);

  if (authChangeListener == null) {
    setAuthChangeListener(registerAuthChangeListener());
  }
  
  return (
    <AuthUserContext.Provider value={getUserFromCookie()}>
      {children}
    </AuthUserContext.Provider>
  );
});

export default AuthContextProvider;