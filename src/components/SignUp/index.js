import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Header from '../Header';
import FooterNav from '../FooterNav';
import Registration from './registration';

const SignUpPage = () => (
  <div className="wrapper">
    <Header />
    <SignUpForm />
    <FooterNav />
  </div>
);

class SignUpFormBase extends Component {
  componentDidMount() {
    document.title = 'leveler: receive';
  }

  render() {
    return (
      <section className="signup-form">
        <p><b>GUIDELINES:</b></p>
        <ol>
          <li className="bold">Only submit to the database if you are directly impacted.</li>
          <li>All professions are welcome.</li>
          <li>If you got what you need, ask to be removed by emailing leveler.info@gmail.com</li>
          <li>If you've received too much, consider redistributing it.</li>
        </ol>
        <p className="legend">* fields with an asterisk will be made public.</p>
        <Registration firebase={this.props.firebase} />
      </section>
    );
  }
}

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm };
