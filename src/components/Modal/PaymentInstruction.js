import React from 'react';

const PaymentInstruction = (props) => (
  <>
    {props.isOpen ? (
      <>
        <div className="modal">
          {props.data.includes('Paypal')
          && (
            <>
              <h4>Agregar su URL de Paypal</h4>
              <p>
                Si aún no tienes un link de paypal.me,
                ve a
                {' '}
                <b><a href="https://www.paypal.me">www.paypal.me</a></b>
                {' '}
                y da click
                {' '}
                <b>crear tu link</b>
                {' '}
                para crear tu url único.
                {' '}
                los links de paypal.com pueden ser problemáticos para pagos de persona a persona, por lo cuál recomendamos usar paypal.me
                {' '}
                <b><a href="https://www.paypal.me">www.paypal.me</a></b>
                .
              </p>
              <p>
                Por favor recuerda poner el url completo, se debería de ver así:
              </p>
              <p>
                <b>paypal.me/tunombredeusuario </b>
                <br />
                o
                <br />
                <b>https://paypal.me/tunombredeusuario </b>
              </p>
            </>
          )}
          {props.data.includes('not adding a valid payment link') || props.data.includes('we need a real URL here')
          || props.data.includes('necesario')
            ? (
              <>
                <h4>Agregar su URL de Paypal</h4>
                <p>
                  Si aún no tienes un link de paypal.me,
                  ve a
                  {' '}
                  <b><a href="https://www.paypal.me">www.paypal.me</a></b>
                  {' '}
                  y da click
                  {' '}
                  <b>crear tu link</b>
                  {' '}
                  para crear tu url único.
                  {' '}
                  los links de paypal.com pueden ser problemáticos para pagos de persona a persona, por lo cuál recomendamos usar paypal.me
                  {' '}
                  <b><a href="https://www.paypal.me">www.paypal.me</a></b>
                  .
                </p>
                <p>
                  Por favor recuerda poner el url completo, se debería de ver así:
                </p>
                <p>
                  <b>paypal.me/tunombredeusuario </b>
                  <br />
                  o
                  <br />
                  <b>https://paypal.me/tunombredeusuario </b>
                </p>
              </>
            ) : null}
        </div>
        <div className="modal-overlay" onClick={() => props.closeModal()} />
      </>
    ) : null}
  </>
);

export default PaymentInstruction;
