import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const getUserData = async (firebase, authUser) => {
  const { userCollection } = firebase;
  try {
    const doc = await userCollection.doc(authUser.uid).get()
    const user = doc.data()

    return user;
  } catch (e) {
    console.log(e.message)
  }
};

const registerAuthChangeListener = (firebase, setUserContext) => 
  firebase.auth.onAuthStateChanged(
    async (authUser) => {
      const userData = authUser ? await getUserData(firebase, authUser) : null; 
      setUserContext({ authUser, userData});
    }
  )
;

const AuthContextProvider = withFirebase(props => {
  const [userContext, setUserContext] = React.useState({});

  const { children, firebase } = props;

  React.useEffect(() =>
    registerAuthChangeListener(firebase, setUserContext)
  );

  return (
    <AuthUserContext.Provider value={userContext}>
      {children}
    </AuthUserContext.Provider>
  );
});

export default AuthContextProvider;