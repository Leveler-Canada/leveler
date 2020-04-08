import React, { Component } from "react";
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

  	componentDidMount() {
		  document.title = "leveler"
    }

  render() {
    return (
      <section>
        <p>
          {localizationBundle.intro.main}
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
          <Link to="/signup" onClick={this.onReceiveClick}>
            <button className="btn">receive</button>
          </Link>

          <Link to="/resources" onClick={this.onResourcesClick}>
            <button className="btn">resources</button>
          </Link>
        </div>
      </section>
    );
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
