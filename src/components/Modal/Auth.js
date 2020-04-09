import React from 'react';

const Auth = (props) => (
  <>
    {props.modalIsOpen ? (
      <>
        <div className="modal">
          auth
        </div>
        <div className="modal-overlay" onClick={() => props.toggleModal(props.modalIsOpen)} />
      </>
    ) : null}
  </>
);

export default Auth;
