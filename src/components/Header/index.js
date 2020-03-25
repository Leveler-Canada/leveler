import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import ContributeBand from './ContributeBand'

const Header = () => (
	<header>
		<ContributeBand/>
		<Link to={ROUTES.HOME}><img src="./leveler-logo.png" alt="Logo img" /></Link>
		<p className="top">peer to peer wealth distribution</p>
	</header>
)
export default Header;