import React, { Component } from "react";
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import ReactGA from 'react-ga';
import ReactMarkdown from 'react-markdown';
import aboutPath from './About.md';

const AboutPage = () => (
	<div className="wrapper">
		<Header />
		<AboutLanding  />
		<FooterNav />
	</div>
);

class AboutLandingBase extends Component {

    constructor(props) {
        super(props)
        this.state = { about: null }
    }

    componentWillMount() {
        fetch(aboutPath).then((response) => response.text()).then((text) => {
            this.setState({ about: text })
        })
    }

  	async componentDidMount() {
		document.title = "Leveler: About the Leveler"
		ReactGA.initialize('UA-160733498-01');
		ReactGA.pageview(window.location.pathname + window.location.search); 
	}

  render() {
    return (
		<section className="about">
            <ReactMarkdown source={this.state.about}></ReactMarkdown>
		</section>
    );
  }
}

const AboutLanding = withFirebase(AboutLandingBase);

export default AboutPage;

export { AboutLanding };