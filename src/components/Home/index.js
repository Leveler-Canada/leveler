import React, { Component } from "react";
import { withFirebase } from '../Firebase';


const HomePage = () => (
	<div>
		<HomeLanding  />
	</div>
);


const INITIAL_STATE = {
	currentGroup: '',
	maxGroup: '',
	loading: false
};

class HomeLandingBase extends Component {
	state = { ...INITIAL_STATE };

  async componentDidMount() {
		this.keepCount()
	}
	setCount(state) {
		let { currentGroup, maxGroup } = this.state;
		
		if (currentGroup === maxGroup) {
			currentGroup = 1;
		} else {
			currentGroup = currentGroup + 1;
		}
		console.log('donate to group ', currentGroup)
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

	countListener() {
		this.props.firebase.currentGroupCount().on('value', snapshot => {
			this.setState({
				currentGroup: snapshot.val().count,
			})
		})
	}
  
  render() {
		
    return (
			// <div>
			// 	<p>Get group below</p>
  			// <input id="btn" value="Click here for group number" type="button" onClick={() => { this.setCount(this.state) }}/>
			// 	<p>Current Group</p>
			// 	<p>{this.state.currentGroup}</p>
			// 	<p>Max Group</p>
			// 	<p>{this.state.maxGroup}</p>

			// </div>
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
			  <h3>How it works. MUST BE DONE ON A MOBILE DEVICE: </h3>
			  <ol>
				<li>Click the button below to be assigned 10 people. </li>
				<li>Pay each of those people $5.00. Put "leveler" in the memo.</li>
				<li>Repeat Steps 1 and 2 as many times as you wish. </li>
			  </ol>
			  <div className="btn-wrap">
				<button onClick={this.handleClick}>distribute</button>
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
				  donate to admins
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




