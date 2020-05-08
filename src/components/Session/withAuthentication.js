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
            : this.setState({ authUser: null, userData: null });
            if (authUser !== null) {
              this.getUserData(authUser)
            }
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

          if (user) {
            this.setState({
              userData: user
            })
          }
        } catch(e) {
          console.log(e.message)
        }
      }
      
    render() {
      const Inner = () => <Component {...this.props} authUser={this.state.authUser} userData={this.state.userData}/>;
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Inner/>
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};
export default withAuthentication;