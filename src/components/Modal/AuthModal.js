import React, { useState } from 'react';
import SignUp from '../Form/SignUp';
import LogIn from '../Form/Login';

const AuthModal = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [signupError, setSignUpError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const SIGN_UP_SUCCESS = 'Thanks for signing up! You can now submit links - we are planning more features for the future';
  const LOG_IN_SUCCESS = 'Welcome back!';

  const {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    fieldValue,
    userCollection,
  } = props.firebase;

  const addUserToDb = async (username, userId) => {
    const payload = {
      id: username,
      karma: 0,
      about: '',
      submitted: [],
      created: fieldValue.serverTimestamp(),
    };
    try {
      await userCollection
        .doc(userId)
        .set(payload).then(() => {
          userCollection
            .doc(userId)
            .collection('private').add({
              role: 'user',
            });
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const signUpUser = async (valuesObj) => {
    const { username, email, password } = valuesObj;
    // signup using firebase auth
    try {
      const authUser = await doCreateUserWithEmailAndPassword(email, password);
      if (authUser) {
        addUserToDb(username, authUser.user.uid);
        setSubmitted(true);
        setSuccessMessage(SIGN_UP_SUCCESS);
      }
    } catch (e) {
      setSignUpError(e.message);
    }

    // add user to userCollection in DB
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

export default AuthModal;
