/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const ContributeBand = () => (
	<div className="contribute-band">
		<Link to={ROUTES.CONTRIBUTE}>
			📢 Leveler is volunteer-led. <b><u>Click here</u></b> to contribute to the team ❤️
		</Link>
	</div>
)
export default ContributeBand;