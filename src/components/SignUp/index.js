import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import Registration from './registration';
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
		document.title = "Leveler: Sign Up"
		ReactGA.initialize('UA-160733498-01');
		ReactGA.pageview(window.location.pathname + window.location.search);
	}
	render() {
		return (
			<section className="signup-form">
				<p class="big"><b>Please submit your name only if you are DIRECTLY compromised</b> i.e. your next job got cancelled, or your pay just got cut due to health and safety restrictions.</p>
				<p>Once you submit, an admin in your area will add you to the list.</p>
				<p><i>If you feel that you have received what you need, please email <a href="mailto:dbastudionyc@gmail.com">our team</a> so that we may take you off the list and allow for distribution to those in need.</i></p>
				<p>*fields with an asterisk will be made public.</p>
				<Registration firebase={this.props.firebase}/>
			</section>
		)
	}
}

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm };