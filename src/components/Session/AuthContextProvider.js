import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const getUserData = async (authUser) => {
  const { userCollection } = this.props.firebase;
  try {
    const doc = await userCollection.doc(authUser.uid).get()
    const user = doc.data()

    if (user) {
      this.setState({
        userData: user
      })
    }
  } catch (e) {
    console.log(e.message)
  }
};

const setStateOnAuthChanged = () => {
  const { auth } = this.props.firebase;

  this.listener = await auth.onAuthStateChanged(
    (authUser) => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null, userData: null });
      if (authUser !== null) {
        this.getUserData(authUser)
      }
    },
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