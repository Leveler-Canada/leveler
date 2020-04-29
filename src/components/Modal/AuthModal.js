import React, { useState } from 'react';
import SignUp from '../Form/SignUp';
import LogIn from '../Form/Login';

const AuthModal = ({ firebase, toggleModal, modalIsOpen }) => {
  const [signupError, setSignUpError] = useState('');
  const [loginError, setLoginError] = useState('');

  const {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    fieldValue,
    userCollection,
  } = firebase;

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
        await authUser.user.updateProfile({ displayName: username });
        await addUserToDb(username, authUser.user.uid);
        toggleModal(modalIsOpen);
      }
    } catch (e) {
      setSignUpError(e.message);
    }
  };

  const loginUser = async (valuesObj) => {
    const { username, email, password } = valuesObj;

    try {
      await doSignInWithEmailAndPassword(email, password);
      toggleModal(modalIsOpen);
    } catch (e) {
      setLoginError(e.message);
    }
  };

  return (
    <>
      {modalIsOpen ? (
        <>
          <div className="modal" id="auth-modal">
            <SignUp
              signUpUser={signUpUser}
              error={signupError}
            />
            <LogIn
              loginUser={loginUser}
              error={loginError}
            />
          </div>
          <div className="modal-overlay" onClick={() => toggleModal(modalIsOpen)} />
        </>
      ) : null}
    </>
  );
};

export default AuthModal;
