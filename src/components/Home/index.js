import React, { Component } from "react";
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';

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
		document.title = "leveler"
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
					leveler is a tool for people with job security to help people whose work status
					has been impacted by COVID-19.
					The list includes freelancers, service industry, and gig economy workers.
					</p>
				<p className="info">
					Click <b>distribute</b> below to be shown 10 individuals to contribute to. Click the payment link
						for each one, and hit send. We recommend sending each person $5.00 to $10.00.
					</p>
				<p className="info">This is a <b>mobile-first</b> tool. Please participate from your phone instead of your computer.</p>
				<div className="btn-wrap">
					<Link to="/distribute" className="dist-btn" onClick={this.onDistributeClick}>
						<button className="btn">distribute</button>
					</Link>
					<Link to="/signup" onClick={this.onReceiveClick}>
						<button className="btn">receive</button>
					</Link>
				</div>
			</section>
    );
  }

  onReceiveClick = () => {
    const { logEvent } = this.props.firebase;
    logEvent("receive_clicked");
  };

  onDistributeClick = () => {
    const { logEvent } = this.props.firebase;
    logEvent("distribute_clicked");
  };
}

const HomeLanding = withFirebase(HomeLandingBase);

export default HomePage;

export { HomeLanding };
