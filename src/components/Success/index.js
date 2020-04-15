import React, { Component } from "react";
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const SuccessPage = () => (
	<div className="wrapper">
		<Header />
		<SuccessLanding  />
		<FooterNav />
	</div>
);

const MAILCHIMP_URL = "https://leveler.us19.list-manage.com/subscribe/post?u=684bbb5a5125c30c1f0016222&amp;id=dc37d76685";

const INITIAL_STATE = {
	entries: []
};

class SuccessLandingBase extends Component {
	state = { ...INITIAL_STATE };

  async componentDidMount() {
		document.title = "leveler: bienvenidos"
	}

  render() {
    return (
      <section>
        <h3>Bueno!</h3>
        <p>Te uniste a la base de datos de leveler.</p>
        <p>
          Si quieres que te mandemos actualizaciones de la plataforma, 
          regístrate abajo (este registro es completamente voluntario e 
          independiente a tu lugar en la base de datos).
        </p>
        <div className="mailchimp-form">
          <MailchimpSubscribe url={MAILCHIMP_URL} />
        </div>
      </section>
    );
  }
};

const SuccessLanding = withFirebase(SuccessLandingBase);

export default SuccessPage;

export { SuccessLanding };