import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';
import localizationBundle from '../../constants/dictionary';

const FooterNav = (props) => {
  const onAboutClick = () => {
    const { logEvent } = props.firebase;
    logEvent('mex_contribute_url_clicked_footer_nav');
  };

  const onDistributeClick = () => {
    const { logEvent } = props.firebase;
    logEvent('mex_distribute_url_clicked_footer_nav');
  };

  const onReceiveClick = () => {
    const { logEvent } = props.firebase;
    logEvent('mex_receive_url_clicked_footer_nav');
  };

  const onResourcesClick = () => {
    const { logEvent } = props.firebase;
    logEvent('mex_resources_url_clicked_footer_nav');
  };

  const onContributeClick = () => {
    const { logEvent } = props.firebase;
    logEvent('mex_contribute_url_clicked_footer_nav');
  };

  return (
    <footer>
      <Link to="/about" onClick={onAboutClick}>
        {localizationBundle.footer.about}
        {' '}
        leveler
      </Link>

      <Link
        to="/distribute"
        onClick={onDistributeClick}
      >
        {localizationBundle.distribute}
      </Link>

      <Link
        to="/signup"
        onClick={onReceiveClick}
      >
        {localizationBundle.recive}
      </Link>

      <a
        href="https://docs.google.com/document/d/1OqjFn7f5YRxzD71v-ieGSruQUdTST5K3woPl-yrDDkc/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        updates
      </a>

      <Link
        to="/contribute"
        onClick={onContributeClick}
      >
        contribute
      </Link>
    </footer>
  );
};

FooterNav.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export default withFirebase(FooterNav);
