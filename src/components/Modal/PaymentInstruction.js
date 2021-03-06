import React from 'react';

const PaymentInstruction = (props) => (
  <>
    {props.isOpen ? (
      <>
        <div className="modal">
          {props.data.includes('Venmo')
          && (
            <>
              <h4>Adding your Venmo link</h4>
              <p>
                Do not enter a url containing your username, this will make
                opening your link glitchy!
              </p>
              <p>
                Open your Venmo app, open the menu bar, and click onto
                your venmo code next to your profile picture.
                Click the “send” icon and then “copy” to copy your payment URL.
                Paste this url into the payment field we provide.
              </p>
              <p>
                Your url will look like:
              </p>
              <b>https://venmo.com/code?user_id=12345678…</b>
            </>
          )}
          {props.data.includes('Paypal')
          && (
            <>
              <h4>Adding your Paypal link</h4>
              <p>
                If you do not already have a paypal.me link,
                go to
                {' '}
                <b><a href="https://www.paypal.me">www.paypal.me</a></b>
                {' '}
                and click
                {' '}
                <b>get started</b>
                {' '}
                to create your personal url.
                {' '}
                paypal.com links can be problematic for peer-to-peer payments so if you do not have a paypal.me link already you can sign up for one at
                {' '}
                <b><a href="https://www.paypal.me">www.paypal.me</a></b>
                .
              </p>
              <p>
                Please remember to post the full url, it should look like:
              </p>
              <p>
                <b>paypal.me/yourusername </b>
                <br />
                or
                <br />
                <b>https://paypal.me/yourusername </b>
              </p>
            </>
          )}
          {props.data.includes('Cash')
          && (
            <>
              <h4>Adding your Cash link</h4>
              <p>
                Make sure you've created a 'Cashtag' within your Cash app, then
                enter the link like so:
              </p>
              <b>cash.app/$yourcashtag</b>
            </>
          )}
          {props.data.includes('not adding a valid payment link') || props.data.includes('we need a real URL here')
          || props.data.includes('required')
            ? (
              <>
                <h4>Whoops!</h4>
                <p>Looks like you're trying to add a link we dont recognize.</p>
                <p>Please add your payment link, from one of the following three platforms:</p>
                <p>Venmo, Paypal, Cash</p>
              </>
            ) : null}
        </div>
        <div className="modal-overlay" onClick={() => props.closeModal()} />
      </>
    ) : null}
  </>
);

export default PaymentInstruction;
