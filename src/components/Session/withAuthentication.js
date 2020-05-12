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

const withAuthentication = (Component) => withFirebase((props) => {
  const authUser = props.firebase.auth().currentUser;
  return <Component {...props} authUser={authUser} userData={async () => await getUserData(authUser)} />;
});

export default withAuthentication;