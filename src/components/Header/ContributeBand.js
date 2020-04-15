/* eslint-disable no-tabs */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import localizationBundle from '../../constants/dictionary';

const ContributeBand = (props) => {
  const onBandClick = () => {
    const { logEvent } = props.firebase;
    logEvent('mex_contribute_url_clicked_contrib_band');
  };
  return (
		<div className="contribute-band">
			<Link to={ROUTES.CONTRIBUTE} onClick={onBandClick}>
        {localizationBundle.contributeBand.volunteerLed}
        <b>{localizationBundle.clickHere}</b>
        {localizationBundle.contributeBand.volunteerContribute}
			</Link>
		</div>
  );
};

ContributeBand.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export default withFirebase(ContributeBand);
