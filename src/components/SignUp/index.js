import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import ReactGA from 'react-ga';

const SignUpPage = () => (
	<div className="wrapper">
		<Header />
		<SignUpForm  />
		<FooterNav />
	</div>
);

class SignUpFormBase extends Component {
	componentDidMount() {
		ReactGA.initialize('UA-160733498-01');
		ReactGA.pageview(window.location.pathname + window.location.search);
	}
	render() {
		return (
			<div>
				SIGNUP
			</div>
		)
	}
}

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm };