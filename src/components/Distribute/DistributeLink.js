import React from 'react';
import { Paypal, Venmo, Patreon, Cash } from '../Icons'

const DistributeLink = props => (
	<a 
		href={props.link}
		target="_blank"
		rel="noopener noreferrer"
		className="payment-link"
	>
		{props.link.includes('paypal') ? (
			<Paypal height="35" width="40" />
		): null}
		{props.link.includes('venmo') ? (
			<Venmo height="40" />
		): null}
		{props.link.includes('cash') ? (
			<Cash height="40" />
		): null}
		{props.link.includes('patreon') ? (
			<Patreon height="40" />
		): null}
	</a>
)

export default DistributeLink;
