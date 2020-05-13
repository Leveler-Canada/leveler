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

const registerAuthChangeListener = (firebase, setUserContext) => {
  const { auth } = firebase;

  const listener = auth.onAuthStateChanged(
    async (authUser) => {
      const userData = authUser ? await this.getUserData(authUser) : null; 
      setUserContext({ authUser, userData});
    }
  );

  React.useEffect(registerAuthChangeListener(firebase));

  return listener
};

const AuthContextProvider = withFirebase(({ children, firebase }) => {
  const [userContext, setUserContext] = React.useState(null);
  const [authChangeListener, setAuthChangeListener] = React.useState(null);

  if (authChangeListener == null) {
    setAuthChangeListener(registerAuthChangeListener(firebase, setUserContext));
  }

  return (
    <AuthUserContext.Provider value={userContext}>
      {children}
    </AuthUserContext.Provider>
  );
});

export default AuthContextProvider;