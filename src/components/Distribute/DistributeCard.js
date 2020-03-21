import React, { Component } from 'react'
import DistributeLink from './DistributeLink';

export default class DistributeCard extends Component {
	state = {
		linkClicked: false,
		contributeChecked: false
	}

	setClicked() {
		this.setState({
			linkClicked: true
		})
	}

  handleCheckboxChange = event =>
    this.setState({ contributeChecked: event.target.checked })
	

	render() {
		const { entry } = this.props;

		return (
			<div className="card-container">
				<div className="card-header"> 
					<div>
						{entry.location.state ? (
							<div><p><b>{entry.location.city}, {entry.location.state}</b></p></div>
						): (
							<div><p><b>{entry.location.city}, {entry.location.country}</b></p></div>
						)}
						<div><p><b>{entry.industry}</b></p></div>
					</div>

					<div>
						<a>report error</a>
					</div>
					
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
							contributeChecked={this.state.contributeChecked}
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
	<p><b>I contributed</b></p>
	<label id="checkbox-container">
		<input name="contributed" type="checkbox" {...props}/>
		<span id="custom-checkmark"></span>
	</label>
	</span>
)
