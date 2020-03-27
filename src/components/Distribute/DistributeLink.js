import React from 'react';
import {
  Paypal, Venmo, Patreon, Cash, QuestionMark,
} from '../Icons';

const DistributeLink = (props) => (
  <a
    href={props.link}
    target="_blank"
    rel="noopener noreferrer"
    className="payment-link"
  >
    {props.link.includes('paypal') ? (
      <Paypal height="35" width="40" />
    ) : null}
    {props.link.includes('venmo') ? (
      <Venmo height="40" />
    ) : null}
    {props.link.includes('cash') ? (
      <Cash height="40" />
    ) : null}
    {props.link.includes('patreon') ? (
      <Patreon height="40" />
    ) : null}

    {!props.link.includes('paypal')
		 && !props.link.includes('venmo')
		 && !props.link.includes('cash')
		 && !props.link.includes('patreon') ? (
  <QuestionMark height="40" />
		  ) : null}
  </a>
);

export default DistributeLink;
