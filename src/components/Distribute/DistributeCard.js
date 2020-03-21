import React from 'react';
import DistributeLink from './DistributeLink';

const DistributeCard = (props) => (
	<div className="card-container">
		<div className="card-header"> 
			<div>
				{props.entry.location.state ? (
					<div><p><b>{props.entry.location.city}, {props.entry.location.state}</b></p></div>
				): (
					<div><p><b>{props.entry.location.city}, {props.entry.location.country}</b></p></div>
				)}
				<div><p><b>{props.entry.industry}</b></p></div>
			</div>

			<div>
				<a>report error</a>
			</div>
			
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