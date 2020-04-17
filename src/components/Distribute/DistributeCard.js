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

	onPaymentLinkClick = (link) => {
		const { logEvent } = this.props;
		logEvent("mex_p2p_link_clicked_dist_card", { link });
		this.setState({ linkClicked: true });
	}

  handleCheckboxChange = event => {
		this.setState({ contributeChecked: event.target.checked })
		if (event.target.checked) {
			this.updateLikelyContribCount();
		}
	}

	async updateLikelyContribCount() {
		// add to DB
		const { fieldValue, entriesCollection } = this.props;
		const { id } = this.props.entry;
		const docRef = entriesCollection.doc(id);
		try {
			await docRef.update({potential_contrib: fieldValue.increment(1)});
		} catch (e) {
			console.log(e.message)
		}
		// update last contrib timestamp
		this.updateLastLikelyContrib(fieldValue.serverTimestamp())
		// fire off GA event
		const { logEvent } = this.props;
		logEvent("mex_likely_contrib_dist_card");
	}

	async updateLastLikelyContrib (updated) {
    const { miscCollection } = this.props;
    try {
      await miscCollection.doc('lastContrib').update({
        updated,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

	render() {
		const { entry } = this.props;

		return (
			<div className="card-container">
				<div className="card-header"> 
					<div className="location">
						<p><b>{entry.location.city}</b></p>
						{entry.location.country && <p><b>, {entry.location.country}</b></p>}
					</div>
					<p><b>{entry.industry}</b></p>
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
						<span onClick={() => this.onPaymentLinkClick(link)}>
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
