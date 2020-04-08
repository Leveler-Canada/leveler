/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Header from '../Header';
import FooterNav from '../FooterNav';
import { Paypal } from '../Icons';
import localizationBundle from '../../constants/dictionary';

const ContributePage = () => (
  <div className="wrapper">
    <Header />
    <ContributeBody />
    <FooterNav />
  </div>
);

const ContributeBody = () => (
  <section>
    <h3>
      {localizationBundle.contributePage.header}
    </h3>
    <p>
      {localizationBundle.contributePage.text}
    </p>
    <a
      href="http://paypal.me/studiodba"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Paypal width="45" />
    </a>
  </section>
);

export default (ContributePage);

export { ContributeBody };
