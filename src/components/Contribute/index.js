import React from 'react';
import Header from '../Header';
import FooterNav from '../FooterNav';
import {Paypal} from '../Icons/'

const ContributePage = () => (
  <div className="wrapper">
    <Header />
    <ContributeBody />
    <FooterNav />
  </div>
);

const ContributeBody = () => {
	
	return ( 
		<section>
			<h3>
				contribute to leveler
			</h3>
			<p>
				leveler is run by volunteers. We are not funded, and are currently organizing 
				communities outside of the United States.
				If you like this project and would like to help us, please contribute below:
			</p>
			<a href="http://paypal.me/studiodba"
				target="_blank"
				rel="noopener noreferrer">
				<Paypal width="45" />
			</a>
		</section>
	)
}

export default (ContributePage);

export { ContributeBody };