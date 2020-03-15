import React, { Component } from "react";
import { withFirebase } from '../Firebase';


const HomePage = () => (
	<div>
    <h1>Home</h1>
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
			<div>
				<p>Get group below</p>
  			<input id="btn" value="Click here for group number" type="button" onClick={() => { this.setCount(this.state) }}/>
				<p>Current Group</p>
				<p>{this.state.currentGroup}</p>
				<p>Max Group</p>
				<p>{this.state.maxGroup}</p>

			</div>
    );
  }
};

const HomeLanding = withFirebase(HomeLandingBase);

export default HomePage;

export { HomeLanding };




