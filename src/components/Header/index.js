import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const Header = () => (
  <header>
    <Link to={ROUTES.HOME} className="intl-header">
      <span>🇲🇽</span>
      <img src="./leveler-logo.png" alt="Logo img" />
    </Link>
    <p className="top">peer to peer wealth distribution</p>
  </header>
);
export default Header;
