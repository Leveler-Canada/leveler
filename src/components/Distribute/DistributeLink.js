/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Paypal, Venmo, Patreon, Cash, QuestionMark,
} from '../Icons';

const DistributeLink = (props) => {
  const { link } = props;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="payment-link"
    >
      {link.includes('paypal') ? (
        <Paypal height="35" width="40" />
      ) : null}
      {link.includes('venmo') ? (
        <Venmo height="40" />
      ) : null}
      {link.includes('cash') ? (
        <Cash height="40" />
      ) : null}
      {link.includes('patreon') ? (
        <Patreon height="40" />
      ) : null}

      {!link.includes('paypal')
		 && !link.includes('venmo')
		 && !link.includes('cash')
		 && !link.includes('patreon') ? (
  <QuestionMark height="40" />
		  ) : null}
    </a>
  );
};

export default DistributeLink;
