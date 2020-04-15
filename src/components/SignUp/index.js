import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import Registration from './registration';
import localizationBundle from '../../constants/dictionary';

const SignUpPage = () => (
  <div className="wrapper">
    <Header />
    <SignUpForm />
    <FooterNav />
  </div>
);

class SignUpFormBase extends Component {
  componentDidMount() {
    document.title = 'leveler: recibe';
  }

  render() {
    return (
      <section className="signup-form">
        <p>
          <b>
            {localizationBundle.guidelinesPage.header}
            :
          </b>

        </p>
        <ol>
          <li className="bold">{localizationBundle.guidelinesPage.important}</li>
          <li>{localizationBundle.guidelinesPage.listSecond}</li>
          <li>{localizationBundle.guidelinesPage.listThird}</li>
        </ol>
        <p className="legend">{localizationBundle.guidelinesPage.legend}</p>
        <Registration firebase={this.props.firebase} />
      </section>
    );
  }
}

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm };
