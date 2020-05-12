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

const withAuthentication = (Component) => withFirebase((props) => {
  const authUser = props.firebase.auth.currentUser;
  const userData = authUser ? getUserData(props.firebase, authUser) : null;
  return <Component {...props} authUser={authUser} userData={userData} />;
});

export default withAuthentication;