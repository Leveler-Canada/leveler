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
          </p>
        <p>
          Click <b>distribute</b> below to be shown 5 individuals to contribute to. Click the payment link
            for each one, and hit send.
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
          <button className="btn">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfjHiWFg1CZpZJ7cfOE6v6f83m8Y92Ol0NrH3qXiqsII1H5GA/viewform" target="_blank">create your own leveler</a>
          </button>
        </div>
      </section>
    );
  }

  getLastUpdates = async () => {
    const { miscCollection } = this.props.firebase;
    try {
      await miscCollection
        .doc('entriesMeta')
        .get()
        .then((docSnap) => {
          const data = docSnap.data();
          this.setState({
            lastContrib: timeago.format(data.lastContrib.toDate()),
            lastSignup: timeago.format(data.lastSignup.toDate()),
            lastUpvote: timeago.format(data.lastUpvote.toDate())
          })
        });
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
