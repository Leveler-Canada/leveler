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

const ContributeBody = (props) => {
	
	return ( 
		<section>
			<h3>
				contribute to leveler
			</h3>
			<p>
				leveler is run by volunteers. We are not funded, and are currently organizing 
				communities outside of the United States.
				If you are in a position to contribute to the volunteer team, please do so by clicking 
				the button below:
			</p>
			<a href="http://paypal.me/studiodba"
				target="_blank"
				rel="noopener noreferrer">
				<Paypal width="45" />
			</a>
			<h3>
				Volunteer for leveler
			</h3>

			<p>
				If you're looking to help and any of the following apply to you, please contact us:
			</p>

			<p>
				* Developers (Javascript/React/Firebase)
			</p>

			<p>
				* Operations/Support
			</p>

			<p>
				* Marketing
			</p>
			<a href="google.com">
				Sign Up
			</a>
		</section>
	)
}

export default (ContributePage);

export { ContributeBody };