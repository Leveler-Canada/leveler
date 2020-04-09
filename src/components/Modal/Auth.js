import React, { useState } from 'react';
import SignUp from '../Form/SignUp';
import LogIn from '../Form/Login';

const Auth = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [signupError, setSignUpError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const SIGN_UP_SUCCESS = 'Thanks for signing up! You can now submit links - we are planning more features for the future';
  const LOG_IN_SUCCESS = 'Welcome back!';

  const {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    userCollection,
  } = props.firebase;

  const signUpUser = async (valuesObj) => {
    const { username, email, password } = valuesObj;
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      setSubmitted(true);
      setSuccessMessage(SIGN_UP_SUCCESS);
    } catch (e) {
      setSignUpError(e.message);
    }
  };

  const loginUser = async (valuesObj) => {
    const { username, email, password } = valuesObj;
    const { firebase } = props;

    try {
      await doSignInWithEmailAndPassword(email, password);
      setSubmitted(true);
      setSuccessMessage(LOG_IN_SUCCESS);
    } catch (e) {
      setLoginError(e.message);
    }
  };

  return (
    <>
      {props.modalIsOpen ? (
        <>
          <div className="modal" id="auth-modal">
            {!submitted && (
            <SignUp
              signUpUser={signUpUser}
              error={signupError}
            />
            )}
            {!submitted && (
            <LogIn
              loginUser={loginUser}
              error={loginError}
            />
            )}
            {successMessage && <p>{successMessage}</p>}
          </div>
          <div className="modal-overlay" onClick={() => props.toggleModal(props.modalIsOpen)} />
        </>
      ) : null}
    </>
  );
};

export default Auth;
