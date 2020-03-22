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
					The leveler is a tool for salaried workers to distribute wealth
					evenly across a database of freelancers, service industry and gig
					economy folks who are impacted by COVID-19 health and safety
					restrictions (venue closures, shift/gig/commission cancellations
					etc).
			  </p>
			  <h3>How it works. SHOULD BE DONE ON A MOBILE DEVICE: </h3>
			  <ol>
					<li>Click the button below to be assigned to a Group of 10 people. </li>
					<li>Pay each of the people in your assigned group an equal amount of money. Put "leveler" in the memo.</li>
					<li>Repeat Steps 1 and 2 as many times as you wish. </li>
			  </ol>
			  <div className="btn-wrap">
					<Link to="/distribute">
						<button>distribute</button>
					</Link>
			  </div>
			</section>
    );
  }
};

const HomeLanding = withFirebase(HomeLandingBase);

export default HomePage;

export { HomeLanding };
