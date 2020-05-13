import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

const setUserDataState = async (authUser, setUserData, userCollection) => {
  if ( authUser != null) {
    try {
      const doc = await userCollection.doc(authUser.uid).get()
      const user = doc.data()

      setUserData(user);
    } catch (e) {
      console.log(e.message)
    }
  }
};

const withAuthentication = (Component) => withFirebase((props) => {
  const [userData, setUserData] = React.useState(null);
  const authUser = firebase.auth().currentUser;
  setUserDataState(authUser, setUserData);
  return <Component {...props} authUser={authUser} userData={userData} />;
});

export default withAuthentication;