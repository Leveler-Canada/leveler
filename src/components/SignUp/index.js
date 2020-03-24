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
				<p><b>GUIDELINES:</b></p>
				<ol>
					<li><b>Only submit to the database if you are directly impacted.</b></li>
					<li>If you got what you need, ask to be removed by emailing leveler.info@gmail.com</li>
					<li>If you've received too much, consider redistributing it.</li>
				</ol>
				<p className="legend">* fields with an asterisk will be made public.</p>
				<Registration firebase={this.props.firebase}/>
			</section>
		)
	}
}

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm };