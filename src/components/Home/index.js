import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';

const HomePage = () => (
	<div className="wrapper">
		<Header />
		<HomeLanding  />
		<FooterNav />
	</div>
);

class HomeLandingBase extends Component {
  state = {
    lastContrib: '',
    lastSignup: '',
    lastUpvote: ''
  }

  async componentDidMount() {
    document.title = "leveler"
    this.getLastUpdates()
	}

  render() {
    const { lastContrib, lastSignup, lastUpvote } = this.state;
    return (
      <section>
        <p>
          <b>leveler</b> is a tool for people with job security to help people whose work status
          has been impacted by COVID-19.
          The list includes freelancers, service industry, and gig economy workers.
          </p>
        <p>
          Click <b>distribute</b> below to be shown 10 individuals to contribute to. Click the payment link
            for each one, and hit send. We recommend sending each person $5.00 to $10.00.
          </p>
        <p>This is a <b>mobile-first</b> tool. Please participate from your phone instead of your computer.</p>
        <div className="main-btn-container">
          <Link to="/distribute" className="dist-btn" onClick={this.onDistributeClick}>
            <button className="btn">distribute</button>
          </Link>
          <p className="home-misc">last likely contribution {lastContrib}</p>
          <Link to="/signup" onClick={this.onReceiveClick}>
            <button className="btn">receive</button>
          </Link>
          <p className="home-misc">last signup {lastSignup}</p>
          <Link to="/resources" onClick={this.onResourcesClick}>
            <button className="btn">resources</button>
          </Link>
          <p className="home-misc">last upvote {lastUpvote}</p>
        </div>
      </section>
    );
  }

  getLastUpdates = async () => {
    const { miscCollection } = this.props.firebase;
    try {
      await miscCollection
        .get()
        .then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
            const date = doc.data().updated.toDate()

            switch (doc.id) {
              case 'lastContrib':
                return this.setState({lastContrib: timeago.format(date)})
              case 'lastSignup':
                return this.setState({lastSignup: timeago.format(date)})
              case 'lastUpvote':
                  return this.setState({lastUpvote: timeago.format(date)})
              default:
                break
            }
          })
        })
    } catch(e) {
      console.log(e.message)
    }
  }

  onDistributeClick = () => {
    const { logEvent } = this.props.firebase;
    logEvent("distribute_btn_clicked_home");
  };

  onReceiveClick = () => {
    const { logEvent } = this.props.firebase;
    logEvent("receive_btn_clicked_home");
  };
  onResourcesClick = () => {
    const { logEvent } = this.props.firebase;
    logEvent("resources_btn_clicked_home");
  };
}

const HomeLanding = withFirebase(HomeLandingBase);

export default HomePage;

export { HomeLanding };
