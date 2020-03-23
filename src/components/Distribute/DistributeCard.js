/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react'
import DistributeLink from './DistributeLink';

const INITIAL_STATE = {
	linkClicked: false,
	contributeChecked: false
};

export default class DistributeCard extends Component {
	state = { ...INITIAL_STATE };

	setClicked() {
		this.setState({
			linkClicked: true
		})
	}

	async updateLikelyContribution() {
		const { fieldValue, entriesCollection } = this.props;
		const { id } = this.props.entry;
		const docRef = entriesCollection.doc(id);
		try {
			await docRef.update({potential_contrib: fieldValue.increment(1)});
		} catch (e) {
			console.log(e.message)
		}
	}

  handleCheckboxChange = event => {
		this.setState({ contributeChecked: event.target.checked })
		if (event.target.checked) {
			this.updateLikelyContribution();
		}
	}
	

	render() {
		const { entry } = this.props;

		return (
			<div className="card-container">
				<div className="card-header"> 
					<div>
						<div><p><b>{entry.location}</b></p></div>
					</div>
					
					{this.state.linkClicked ? (
					<div>
						<a 
							href="https://docs.google.com/forms/d/e/1FAIpQLSefrgYTWlmWYtO6l0rJJKTzxnHPLKThX5QazeMHIAkq6Qnh-Q/viewform?usp=sf_link"
							target="_blank"
							rel="noopener noreferrer"
							>report error</a>
					</div>
					) : (null)}
					
				</div>

				<div className="card-body">
					<p>"{entry.description}"</p>
				</div>

				<div className="card-footer">
					{entry.payment_url.map(link => (
						<span onClick={() => {this.setState({linkClicked: true})}}>
							<DistributeLink
								key={link}
								link={link}
							/>
						</span>
					))}
					{this.state.linkClicked ? (
						<Checkbox
							checked={this.state.contributeChecked}
							onChange={this.handleCheckboxChange}
          	/>
					): (null)}
				</div>
			</div>
		)
	}
}
const Checkbox = props => (
	<span className="contributed-container">
	{props.checked ? (
		<p>🙌🏼<b>Thanks!</b></p>
	) : (
		<p><b>I contributed</b></p>
	)}
	<label id="checkbox-container">
		<input name="contributed" type="checkbox" {...props}/>
		<span id="custom-checkmark"></span>
	</label>
	</span>
)
