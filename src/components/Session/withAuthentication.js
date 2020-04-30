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
      
      this.listener = await auth.onAuthStateChanged(
        (authUser) => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
            this.getUserData(authUser)
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    async getUserData(authUser) {
      const { userCollection } = this.props.firebase;
      if (authUser !== null) {
        try {
          await userCollection
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            this.setState({
              userData: doc.data()
            })
          })
        } catch(e) {
          console.log(e.message)
        }
      } else {
        this.setState({
          userData: null
        })
      }
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} authUser={this.state.authUser} userData={this.state.userData}/>
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};
export default withAuthentication;