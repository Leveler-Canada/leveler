/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import FormikPlacesAutocomplete from './FormikPlacesAutocomplete.jsx';
import PaymentInstruction from '../Modal/PaymentInstruction';
import RadioButton from './RadioButton';
import RadioButtonGroup from './RadioButtonGroup';
import { FUNCTIONS_URL } from './../../constants/routes';

const REQUIRED_ERROR = 'required';
const group = process.env.REACT_APP_LEVELER_GROUP;
const addURLScheme = (url) => (/^https?:\/\//.test(url) ? url : `https://${url}`);

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().test(
    'validate unique email',
    'this email is in our system already. reach out to us at canada@leveler.info if you think this is a mistake!',
    (value) => fetch(`${FUNCTIONS_URL}/validateUniqueEmail?email=${value}`).then((resp) => resp.status === 200),
  ).required(REQUIRED_ERROR),
  industry: Yup.string().min(1),
  description: Yup.string().min(1).required(REQUIRED_ERROR),
  social_url: Yup.string()
    .transform(addURLScheme)
    .url('we need a real URL here'),
  payment: Yup.string()
    .transform(addURLScheme)
    .url('we need a real URL here')
    .test('validPaymentLink', '', function (value) {
      if (!value) return false;

      const hostname = value.split('/')[2].toLowerCase();
      const path = value.split('/')[3];

      const [regex, errMsg] = (function (hostname) {
        switch (hostname) {
          case 'cash.app':
            return [/^\$[a-zA-Z0-9]+$/, "⛔️ looks like you're adding a Cash App link improperly"];
          case 'paypal.com':
          case 'www.paypal.com':
            return [/^$/, "⛔️ looks like you're adding a Paypal link improperly"];
          case 'paypal.me':
          case 'www.paypal.me':
            return [/^.+$/, "⛔️ looks like you're adding a Paypal link improperly"];
          case 'venmo.com':
            return [/^code\?user_id=[0-9]{19}$/, "⛔️ looks like you're adding a Venmo link improperly"];
          default:
            return [null, "⛔️ looks like you're not adding a valid payment link"];
        }
      }(hostname));

      return (!!path && !!regex && regex.test(path)) ? true : this.createError({ message: errMsg });
    })
    .required(REQUIRED_ERROR),
});

const Registration = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  // MODAL STATE MANAGEMENT
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };


  const updateLastSignup = async (updated) => {
    const { miscCollection } = props.firebase;
    try {
      await miscCollection.doc('entriesMeta').update({
        lastSignup: updated,
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    if (values.industry === 'other') {
      values.industry = values.other_industry;
      delete values.other_industry;
    }
    values.payment = addURLScheme(values.payment);
    const { entriesCollection, fieldValue, dbFs } = props.firebase;

    const writeBatch = dbFs.batch();

    const entriesRef = entriesCollection.doc();
    const privateRef = entriesRef.collection('private').doc();

    writeBatch
      .set(entriesRef, {
        location: values.location,
        industry: values.industry.trim(),
        description: values.description.trim(),
        payment_url: [values.payment],
        suggestion: values.suggestion.trim(),
        shown: 0,
        potential_contrib: 0,
        group: group,
        random: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      })
      .set(privateRef, {
        email: values.email.trim().toLowerCase(),
        social_url: values.social_url.trim(),
      })
      .commit()
      .then(() => {
        updateLastSignup(fieldValue.serverTimestamp());
        resetForm({});
        setSubmitted(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        industry: '',
        description: '',
        payment: '',
        suggestion: '',
        location: '',
        social_url: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur
      validateOnChange
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        dirty,
        isValid,
      }) => (
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="email">email:</label>
            <span className="description">
              not public. we will not share this with anyone.
            </span>
            <Field
              type="email"
              name="email"
              placeholder="email"
              value={values.email}
            />
            <span className="error">{errors.email}</span>
          </fieldset>
          <fieldset>
            <label htmlFor="location">location*</label>
            <span className="description">
              begin typing your city to select the appropriate province and/or country.
            </span>
            <Field
              name="location"
              component={FormikPlacesAutocomplete}
              value={values.location}
            />
            <span className="error">{errors.location}</span>
          </fieldset>
          <RadioButtonGroup
            id="radioGroup"
            label="industry*"
            value={values.industry}
            error={errors.industry}
            touched={touched.industry}
          >
            <span className="description">
              if your profession(s) fall under multiple industries, select what you feel most comfortable sharing.
            </span>
            <Field
              component={RadioButton}
              name="industry"
              id="Arts"
              label="arts"
            />
            <Field
              component={RadioButton}
              name="industry"
              id="Nightlife"
              label="nightlife"
            />
            <Field
              component={RadioButton}
              name="industry"
              id="Production"
              label="production"
            />
            <Field
              component={RadioButton}
              name="industry"
              id="Food Service/Hospitality"
              label="hospitality"
            />
            <Field
              component={RadioButton}
              name="industry"
              id="Music"
              label="music"
            />
            <Field
              component={RadioButton}
              name="industry"
              id="other"
              label="other"
            />
            {values.industry === 'other' && (
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  value={values.custom_industry}
                  name="other_industry"
                  placeholder="other industry here"
                />
              </div>
            )}
          </RadioButtonGroup>
          <fieldset>
            <label>context*</label>
            <span className="description">
              tell us what you feel comfortable sharing about your situation.
            </span>
            <Field
              as="textarea"
              name="description"
              maxLength="300"
              value={values.description}
            />
            <span className="error">{errors.description}</span>
          </fieldset>
          <fieldset>
            <label htmlFor="payment">payment*</label>
            <span className="description">
              please post the full url to your <a href="https://www.paypal.me/">paypal.me</a> link to receive payment. note that your name may be visible to distributors who click your link. interac is not supported because we do not publically share email addresses.
            </span>
            <input
              type="text"
              onChange={handleChange}
              value={values.payment}
              name="payment"
            />

            {errors.payment && (
            <>
              <span className="error">
                {errors.payment}
                <button className="instructions-btn" onClick={openModal}>instructions</button>
              </span>
            </>
            )}
            <PaymentInstruction
              openModal={openModal}
              closeModal={closeModal}
              isOpen={modalIsOpen}
              data={errors.payment}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="social_url">social</label>
            <span className="description">
              please provide full url for your social media handle. will not be
              made public, however you may get DM'ed by an admin to verify your
              identity.
            </span>
            <input
              type="text"
              onChange={handleChange}
              value={values.social_url}
              name="social_url"
            />
            <span className="error">{errors.social_url}</span>
          </fieldset>
          <fieldset>
            <label>suggestions</label>
            <span className="description">
              let us know if you see room for improvement or have ideas on how
              to help make leveler better.
            </span>
            <Field
              as="textarea"
              maxLength="300"
              value={values.suggestion}
              name="suggestion"
            />
          </fieldset>
          <button
            className="btn"
            type="submit"
            disabled={!(dirty && isValid)}
          >
            Submit
          </button>
          {submitted ? <Redirect to="/success" /> : null}
        </Form>
      )}
    </Formik>
  );
};

export default Registration;
