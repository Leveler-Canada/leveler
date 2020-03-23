import React, { Component } from "react";
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import ReactGA from 'react-ga';

const SuccessPage = () => (
	<div className="wrapper">
		<Header />
		<SuccessLanding  />
		<FooterNav />
	</div>
);

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
            <div id="mc_embed_signup">
                <form 
                    action="https://leveler.us19.list-manage.com/subscribe/post?u=684bbb5a5125c30c1f0016222&amp;id=dc37d76685" 
                    method="post" id="mc-embedded-subscribe-form" 
                    name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate
                >
    		        <div id="mc_embed_signup_scroll">
				        <label for="mce-EMAIL">subscribe to leveler updates</label>
				        <input type="email" value="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
    		        <div style={{position: 'absolute', left: "-5000px"}} aria-hidden="true"><input type="text" name="b_684bbb5a5125c30c1f0016222_dc37d76685" tabindex="-1" value=""/></div>
    		            <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="btn"/></div>
    	            </div>
	            </form>
		    </div>
		</section>
    );
  }
};

const SuccessLanding = withFirebase(SuccessLandingBase);

export default SuccessPage;

export { SuccessLanding };