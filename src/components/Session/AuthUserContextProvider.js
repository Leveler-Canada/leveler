import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import isEqual from 'lodash.isequal';

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

const registerAuthChangeListener = (firebase, setUserContext, userContext) => 
  firebase.auth.onAuthStateChanged(
    async (authUser) => {
      const userData = authUser ? await getUserData(firebase, authUser) : null; 

      // Since onAuthState will trigger minimum once per component mount if there is a user logged in, 
      // AND since we set state once we have new userData,
      // need to do a deep compare here to check if user is different before setting state
      // otherwise we will trigger a loop
      if (!isEqual(userData, userContext.userData)) {
        setUserContext({ authUser, userData});
      }
    }
  )
;

const AuthContextProvider = withFirebase(props => {
  const [userContext, setUserContext] = React.useState({});

  const { children, firebase } = props;

  React.useEffect(() =>
    registerAuthChangeListener(firebase, setUserContext, userContext)
  );

  return (
    <AuthUserContext.Provider value={userContext}>
      {children}
    </AuthUserContext.Provider>
  );
});

export default AuthContextProvider;