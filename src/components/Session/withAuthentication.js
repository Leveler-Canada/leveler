import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const setUserDataState = async (firebase, authUser, setUserData) => {
  const { userCollection } = firebase;
  if ( authUser != null) {
    try {
      const doc = await userCollection.doc(authUser.uid).get()
      const user = doc.data()

      return user;
    } catch (e) {
      console.log(e.message)
    }
  }
};

const withAuthentication = (Component) => withFirebase((props) => {
  const [userData, setUserData] = React.useState(null);
  const authUser = props.firebase.auth.currentUser;
  setUserDataState(props.firebase, authUser, setUserData);
  return <Component {...props} authUser={authUser} userData={userData} />;
});

export default withAuthentication;