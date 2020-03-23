import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import ReactGA from 'react-ga';

const HomePage = () => (
	<div className="wrapper">
		<Header />
		<HomeLanding  />
		<FooterNav />
	</div>
);

const INITIAL_STATE = {
	entryCount: ''
};

class HomeLandingBase extends Component {
	state = { ...INITIAL_STATE };

  	async componentDidMount() {
		document.title = "Leveler"
		ReactGA.initialize('UA-160733498-01');
		ReactGA.pageview(window.location.pathname + window.location.search);
		this.getEntryCount(); 
	}

	async getEntryCount() {
		await this.props.firebase.entriesIndexCollection.get().then(snap => {
			this.setState({
				entryCount: snap.size
			})
		})
	}

  render() {
    return (
			<section>
			  <p className="info">
					Leveler is a tool for people with job security to help people whose work status 
					has been impacted by COVID-19.
					The list includes freelancers, service industry, and gig economy workers.
			  </p>
				<br />
			  <p className="info">				
					Click <b>distribute</b> below to be shown 10 individuals to contribute to. Click the payment link 
					for each one, and hit send. We recommend sending each person $5.00 to $10.00.
				</p>
				<br />
				<p className="info">This is a <b>mobile-first</b> tool. Please participate from your phone instead of your computer.</p>
			  <div className="btn-wrap">
					<Link to="/distribute" class="dist-btn" onClick={this.onDistributeClick}>
						<button>distribute</button>
					</Link>
					<a
						href="https://docs.google.com/forms/d/1pYA60eG7qG4ekLWf7kEUwJuwJnS6sc8KAH_RPdawvJU/edit#responses"
						target="_blank"
            rel="noopener noreferrer"
            onClick={this.onSignUpClick}
					>
            <button>receive</button>
          </a>
					{/* <Link to="/signup">
						<button>receive</button>
					</Link> */}
			  </div>
			</section>
    );
  }

	onSignUpClick = () => {
		const { logEvent } = this.props.firebase;
	  logEvent("signup_clicked");
	}

	onDistributeClick = () => {
	  const { logEvent } = this.props.firebase;
	  logEvent("distribute_clicked");
  }
};

const HomeLanding = withFirebase(HomeLandingBase);

export default HomePage;

export { HomeLanding };
