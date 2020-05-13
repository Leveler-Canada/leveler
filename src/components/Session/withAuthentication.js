import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: null,
      userData: null
    }

    async componentDidMount() {
      const { auth } = this.props.firebase;

      this.listener = auth.onAuthStateChanged(
        async (authUser) => {
          const userData = authUser ? await this.getUserData(authUser) : null; 
          this.setState({ authUser, userData});
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    async getUserData(authUser) {
      const { userCollection } = this.props.firebase;
      try {
        const doc = await userCollection.doc(authUser.uid).get()
        const user = doc.data()

        return user;
      } catch (e) {
        console.log(e.message)
      }
    }

    render() {
      const Inner = () => <Component {...this.props} authUser={this.state.authUser} userData={this.state.userData} />;
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Inner />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};
export default withAuthentication;