import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import ReactGA from 'react-ga';

const DistributePage = () => (
	<div className="wrapper">
		<Header />
		<DistributeTable  />
		<FooterNav />
	</div>
);

class DistributeTableBase extends Component {
	componentDidMount() {
		ReactGA.initialize('UA-160733498-01');
		ReactGA.pageview(window.location.pathname + window.location.search);
	}
	render() {
		return (
			<div>
				DISTRIBUTE
			</div>
		)
	}
}

const DistributeTable = withFirebase(DistributeTableBase);

export default DistributePage;

export { DistributeTable };