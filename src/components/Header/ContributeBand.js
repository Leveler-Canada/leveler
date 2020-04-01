/* eslint-disable no-tabs */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const ContributeBand = (props) => {
  const onBandClick = () => {
    const { logEvent } = props.firebase;
    logEvent('contribute_url_clicked_contrib_band');
  };
  return (
		<div className="contribute-band">
			<Link to={ROUTES.CONTRIBUTE} onClick={onBandClick}>
					📢 leveler is volunteer-led.
					<b> Click here </b>
					to contribute to the team ❤️
			</Link>
		</div>
  );
};

ContributeBand.propTypes = {
  firebase: PropTypes.object.isRequired,
};

export default withFirebase(ContributeBand);
