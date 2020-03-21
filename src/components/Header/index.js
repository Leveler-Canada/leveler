import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<header>
		<Link to='/'>
			<img src="./leveler-logo.png" alt="Logo img" />
		</Link>
		<p className="top">peer to peer wealth distribution</p>
	</header>
)
export default Header;