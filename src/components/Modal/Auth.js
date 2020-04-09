import React from 'react';
import SignUp from '../Form/SignUp';
import LogIn from '../Form/Login';

const Auth = (props) => {
  const signUpUser = async (valuesObj) => {
    const { username, email, password } = valuesObj;
    const { firebase } = props;
    try {
      await firebase.doCreateUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e.message);
    }
  };

  const loginUser = async (valuesObj) => {
    const { username, email, password } = valuesObj;
    const { firebase } = props;
    try {
      await firebase.doSignInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      {props.modalIsOpen ? (
        <>
          <div className="modal" id="auth-modal">
            <SignUp
              signUpUser={signUpUser}
            />
            <LogIn
              signUpUser={loginUser}
            />
          </div>
          <div className="modal-overlay" onClick={() => props.toggleModal(props.modalIsOpen)} />
        </>
      ) : null}
    </>
  );
};

export default Auth;
