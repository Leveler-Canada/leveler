import React from 'react';

const PaymentInstruction = (props) => (
  <>
    {props.isOpen ? (
      <>
        <div className="modal">
          {props.data.includes('Venmo') && <div>venmo</div>}
          {props.data.includes('Paypal') && <div>paypal</div>}
          {props.data.includes('Cash') && <div>paypal</div>}
        </div>
        <div className="modal-overlay" />
      </>
    ) : null}
  </>
);

export default PaymentInstruction;
