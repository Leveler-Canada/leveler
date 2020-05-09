import React from 'react';
import Modal from 'react-modal';
import {TwitterShareButton, FacebookShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon} from 'react-share';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const shareOptions = {
  url: 'https://leveler.info',
  text: 'i distributed funds to those impacted by COVID-19.',
  subject: 'leveler.info',
};

Modal.setAppElement('#root');

const ShareModal = (props) => (
  <>
    <Modal
      isOpen={props.modalIsOpen}
      style={modalStyles}
      contentLabel="Share Prompt"
    >
      <p>thank you for contributing!</p>
      <p>please consider sharing this platform with your network, and give others the opportunity to contribute.</p>
      <div className="share-options">
        <div className="network">
          <FacebookShareButton
            url={shareOptions.url}
            quote={shareOptions.text}
            className="share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
        <div className="network">
          <TwitterShareButton
            url={shareOptions.url}
            title={shareOptions.text}
            className="share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
        <div className="network">
          <EmailShareButton
            url={shareOptions.url}
            subject={shareOptions.subject}
            body={shareOptions.text}
            className="share-button"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
        <button type="button" className="btn" onClick={props.closeModal}>no, thanks</button>
      </div>
      <button type="button" className="close" onClick={props.closeModal}>x</button>
    </Modal>
  </>
);

export default ShareModal;