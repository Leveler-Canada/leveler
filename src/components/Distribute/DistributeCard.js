/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react'
import DistributeLink from './DistributeLink';

const INITIAL_STATE = {
	linkClicked: false,
	contributeChecked: false,
	errorClicked: false
};

export default class DistributeCard extends Component {
	state = { ...INITIAL_STATE };

	onPaymentLinkClick = (link) => {
		const { logEvent } = this.props;
		logEvent("p2p_link_clicked_dist_card", { link });
		this.setState({ linkClicked: true });
	}

	onReportErrorClick = (entry) => {
		const { errorCollection, fieldValue } = this.props;
		const payload = {
			collection: 'entries',
			type: 'bad_url',
			id: entry.id,
			url: entry.payment_url[0],
			timestamp: fieldValue.serverTimestamp()
		};

		errorCollection.add(payload).catch((error) => {
			console.error("Error adding document: ", error);
		})

		this.setState({ errorClicked: true });
	}

  	handleCheckboxChange = event => {
		this.setState({ contributeChecked: event.target.checked })
		if (event.target.checked) {
			this.updateLikelyContribCount();
		}
		this.props.onCheckboxClick()
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
		logEvent("likely_contrib_dist_card");
	}

	async updateLastLikelyContrib (updated) {
    const { miscCollection } = this.props;
    try {
      await miscCollection.doc('entriesMeta').update({
        lastContrib: updated,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

	render() {
		const { entry } = this.props;
		const { linkClicked, contributeChecked, errorClicked } = this.state;

		return (
			<div className="card-container">
				<div className="card-header">
					<div className="location">
						<p><b>{entry.location.city}</b></p>
						{entry.location.state && <p><b>, {entry.location.state}</b></p>}
					</div>
					<p><b>{entry.industry}</b></p>
					{/* {linkClicked ? (
					<button onClick={() => this.onReportErrorClick(entry)}>
						report error
					</button>
					) : (null)} */}

				</div>

				<div className="card-body">
					<p>"{entry.description}"</p>
				</div>

				<div className="card-footer">
					{entry.payment_url.map(link => (
						<span key={link} onClick={() => this.onPaymentLinkClick(link)}>
							<DistributeLink
								link={link}
							/>
						</span>
					))}
					<div id="footer-right">
						{linkClicked ? (
							<Checkbox
								checked={contributeChecked}
								onChange={this.handleCheckboxChange}
							/>
						): (null)}
						{!errorClicked ? (
						<button type="button" onClick={() => this.onReportErrorClick(entry)}>
							report error
						</button>
						) : (
							<button type="button" disabled>
								reported
							</button>
						)}
					</div>
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
