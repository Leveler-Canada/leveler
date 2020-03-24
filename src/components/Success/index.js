import React, { Component } from "react";
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import ReactGA from 'react-ga';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const SuccessPage = () => (
	<div className="wrapper">
		<Header />
		<SuccessLanding  />
		<FooterNav />
	</div>
);

const MAILCHIMP_URL = "https://leveler.us19.list-manage.com/subscribe/post?u=684bbb5a5125c30c1f0016222&amp;id=dc37d76685";

const INITIAL_STATE = {
	entries: []
};

class SuccessLandingBase extends Component {
	state = { ...INITIAL_STATE };

  async componentDidMount() {
		document.title = "Leveler: Welcome"
		ReactGA.initialize('UA-160733498-01');
		ReactGA.pageview(window.location.pathname + window.location.search);
	}

  render() {
    return (
        <section>
            <h3>Success!</h3>
            <p className="info">You've added yourself to the leveler database.</p>
            <p className="info">
                If you'd like us to keep in touch with you on updates to the platform, sign up below.  
                It's completely voluntary and doesn't effect your placement in the database at all.
            </p>
            <MailchimpSubscribe url={MAILCHIMP_URL}/>
		</section>
    );
  }
};

const SuccessLanding = withFirebase(SuccessLandingBase);

export default SuccessPage;

export { SuccessLanding };