import React from 'react';
import DistributeLink from './DistributeLink';

const DistributeCard = (props) => (
	<div className="card-container">
		<div className="card-header">
			{props.entry.location.state ? (
				<div><b>{props.entry.location.city}, {props.entry.location.state}</b></div>
			): (
				<div><b>{props.entry.location.city}, {props.entry.location.country}</b></div>
			)}
			<div><b>{props.entry.industry}</b></div>
		</div>

		<div className="card-body">
			<p>"{props.entry.description}"</p>
		</div>

		<div className="card-footer">
			{props.entry.payment_url.map(link => (
				<DistributeLink
					key={link}
					link={link}
				/>
			))}
		</div>
	</div>
);

export default DistributeCard;