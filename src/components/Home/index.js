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
           {localizationBundle.intro.distribute}
        </p>
        <p>
          {localizationBundle.intro.mobile}
        </p>
        <div className="main-btn-container">
          <Link to="/distribute" className="dist-btn" onClick={this.onDistributeClick}>
            <button className="btn">{localizationBundle.distribute}</button>
          </Link>
          <Link to="/signup" onClick={this.onReceiveClick}>
            <button className="btn">{localizationBundle.recive}</button>
          </Link>

          <Link to="/resources" onClick={this.onResourcesClick}>
            <button className="btn">{localizationBundle.resources}</button>
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
