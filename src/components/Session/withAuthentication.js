import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import firebase from 'firebase/app';

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

const withAuthentication = (Component) => (props) => {
  const authUser = firebase.auth().currentUser;
  return withFirebase(<Component {...props} authUser={authUser} userData={async () => await getUserData(authUser)} />);
};

export default withAuthentication;