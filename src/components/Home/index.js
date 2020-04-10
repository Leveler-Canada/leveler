import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import { Link } from 'react-router-dom';
import localizationBundle from '../../constants/dictionary';

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

  	componentDidMount() {
      document.title = "leveler"
      this.getLastUpdates()
    }

  render() {
    const { lastContrib, lastSignup, lastUpvote } = this.state;
    return (
      <section>
        <p>
          {localizationBundle.intro.main}
        </p>
        <p>
           {localizationBundle.intro.distribute}
        </p>
        <p>
          {localizationBundle.intro.mobile}
        </p>
        <div className="main-btn-container">
          <Link to="/distribute" className="dist-btn" onClick={this.onDistributeClick}>
            <button className="btn">{localizationBundle.distribute}</button>
          </Link>
          <p className="home-misc">last likely contribution {lastContrib}</p>
          <Link to="/signup" onClick={this.onReceiveClick}>
            <button className="btn">{localizationBundle.recive}</button>
          </Link>

          <Link to="/resources" onClick={this.onResourcesClick}>
            <button className="btn">{localizationBundle.resources}</button>
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
