import React, { Component } from "react";
import { withFirebase } from '../Firebase';
import { SHEET_DB } from '../../constants/routes'

const HomePage = () => (
	<div>
		<HomeLanding  />
	</div>
);

const INITIAL_STATE = {
	currentGroup: '',
	maxGroup: '',
	isMobile: ''
};

class HomeLandingBase extends Component {
	state = { ...INITIAL_STATE };

  async componentDidMount() {
		this.keepCount()
		document.title = "Leveler"
		this.getWindowWidth()
	}

	getWindowWidth() {
		let width = window.screen.width
		if (width < 450) {
			this.setState({
				isMobile: true
			})
		} else {
			this.setState({
				isMobile: false
			})
		}
	}
	async sendToSheet(state) {
		let { currentGroup, maxGroup, isMobile } = this.state;

		if (currentGroup === maxGroup) {
			currentGroup = 1;
		} else {
			currentGroup = currentGroup + 1;
		}

		if (isMobile) {
			alert(`Payment link located on the right side, please distribute to Group ${currentGroup}`)
		}
		await this.updateDbCount(currentGroup)	
		this.getCellNumbers(currentGroup)
	}

		async keepCount() {
		await this.props.firebase.currentGroupCount().on('value', snapshot => {
			this.setState({
				currentGroup: snapshot.val().count,
			})
		})
		this.props.firebase.maxGroupCount().on('value', snapshot => {
			this.setState({
				maxGroup: snapshot.val().count,
			})
		})
	}

	updateDbCount(currentGroup) {
		this.props.firebase.currentGroupCount().update({count: currentGroup});
	}

	getCellNumbers(currentGroup) {
		let cellNumbers = [2,11];
		let multiplier = currentGroup * 10;
		cellNumbers[0] = cellNumbers[0] + multiplier - 10;
		cellNumbers[1] = cellNumbers[1] + multiplier -10;
		this.getSheetRoute(cellNumbers);
	}

	getSheetRoute(cellNumbers) {
		let firstRowStr = cellNumbers[0].toString()
		let secondRowStr = cellNumbers[1].toString()
		let endRoute = `H${firstRowStr}:H${secondRowStr}`;
		const link = SHEET_DB + endRoute;
		this.openInNewTab(link)
	}

	openInNewTab(link) {
		var win = window.open(link, '_blank');
		if (win != null) {
			win.focus();
		}
	}

  render() {
    return (
			<div className="wrapper">
			<header>
			  <img src="./leveler-logo.png" alt="Logo img" />
			  <p className="top">peer to peer wealth distribution</p>
			</header>
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
				<button onClick={() => { this.sendToSheet(this.state) }}>distribute</button>
			  </div>
			</section>
			<footer>
			  <div>
				<a
				  href="https://docs.google.com/document/d/1q4BHgMRKO3W6-gRpGPB6EFXFfvyDLGaCsj7kny7CTG4/edit?usp=sharing"
				  target="_blank"
				>
				  about the leveler
				</a>
			  </div>
			  <div>
				<a
				  href="https://docs.google.com/document/d/1OqjFn7f5YRxzD71v-ieGSruQUdTST5K3woPl-yrDDkc/edit?usp=sharing"
				  target="_blank"
				>
				  updates
				</a>
			  </div>
			  <div>
				<a
				  href="https://docs.google.com/forms/d/1pYA60eG7qG4ekLWf7kEUwJuwJnS6sc8KAH_RPdawvJU/edit#responses"
				  target="_blank"
				>
				  join the database
				</a>
			  </div>
			  <div>
				<a
				  href="https://docs.google.com/document/d/1zyTKTN55fOQHiB5XKtkIVu42_oCtSq7WbFAsLB4blD8/edit?usp=sharing"
				  target="_blank"
				>
				  contribute
				</a>
			  </div>
			</footer>

		  </div>
    );
  }
};

const HomeLanding = withFirebase(HomeLandingBase);

export default HomePage;

export { HomeLanding };




