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

const setStateOnAuthChanged = () => {
  const { auth } = this.props.firebase;

  this.listener = await auth.onAuthStateChanged(
    async (authUser) => {
      const userData = authUser ? await this.getUserData(authUser) : null; 
      this.setState({ authUser, userData});
    }
  );
};

const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  React.useEffect(() => registerAuthChangeListener());
  return (
    <AuthUserContext.Provider value={getUserFromCookie()}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default withFirebase(AuthContextProvider);