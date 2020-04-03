/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import FormikPlacesAutocomplete from './FormikPlacesAutocomplete.jsx';
import RadioButton from './RadioButton';
import RadioButtonGroup from './RadioButtonGroup';

const REQUIRED_ERROR = 'required';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required(REQUIRED_ERROR),
  industry: Yup.string().min(1),
  description: Yup.string().min(1).required(REQUIRED_ERROR),
  social_url: Yup.string()
    .transform((value) => {
      return /^https?:\/\//.test(value) ? value : 'https://' + value;
    })
    .url('we need a real URL here'),
  payment: Yup.string()
    .transform((value) => {
      return /^https?:\/\//.test(value) ? value : 'https://' + value;
    })
    .url('we need a real URL here')
    .test('validPaymentLink', 'we need a valid payment link', function(value) {
      if (!value) return false;

      let hostname = value.split('/')[2];
      let path = value.split('/')[3];

      switch (hostname) {
        case 'paypal.me':
          return /^.+$/.test(path);
        case 'venmo.com':
          return /^code\?user_id=[0-9]{19}$/.test(path);
        default:
          return false;
      }
    })
    .required(REQUIRED_ERROR),
});

const Registration = (props) => {
  const [submitted, setSubmitted] = useState(false);

  const addToEntriesIndex = (entriesIndexPayload, entriesIndexCollection) => {
    const { id } = entriesIndexCollection.doc();
    entriesIndexCollection.doc(id).set(entriesIndexPayload);
  };

  const onSubmit = (values, { resetForm }) => {
    if (values.industry === 'other') {
      values.industry = values.other_industry;
      delete values.other_industry;
    }
    if (values.payment.search(/https?:\/\//) === -1) {
      values.payment = 'https://' + values.payment;
    }
    const { fieldValue, entriesCollection, entriesIndexCollection } = props.firebase;
    const random = entriesCollection.doc().id;
    const entriesCollectionPayload = {
      location: values.location.trim(),
      industry: values.industry.trim(),
      description: values.description.trim(),
      payment_url: [values.payment],
      suggestion: values.suggestion.trim(),
      random,
      created: fieldValue.serverTimestamp(),
    };
    const entriesIndexPayload = {
      parent_id: random,
      email: values.email.trim(),
      social_url: values.social_url.trim(),
      shown: 0,
      potential_contrib: 0,
      created: fieldValue.serverTimestamp(),
    };
    entriesCollection.doc(random).set(entriesCollectionPayload).then(() => {
      addToEntriesIndex(entriesIndexPayload, entriesIndexCollection);
    });
    resetForm({});
    setSubmitted(true);
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
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="email">email:</label>
            <span className="error">{errors.email}</span>
            <input
              type="text"
              onChange={handleChange}
              value={values.email}
              name="email"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="location">location*</label>
            <span className="description">
              begin typing your city to select the appropriate state and/or
              country
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
              tell us what you feel comfortable sharing about your situation
            </span>
            <textarea
              type="text"
              maxLength="300"
              onChange={handleChange}
              value={values.description}
              name="description"
            />
            <span className="error">{errors.description}</span>
          </fieldset>
          <fieldset>
            <label htmlFor="payment">payment*</label>
            <span className="description">
              please post the full public url to your preferred payment
              method(s)
            </span>
            <input
              type="text"
              onChange={handleChange}
              value={values.payment}
              name="payment"
            />
            <span className="error">{errors.payment}</span>
          </fieldset>
          <fieldset>
            <label htmlFor="social_url">social</label>
            <span className="description">
              please provide full url for your social media handle. Will not be
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
            <textarea
              type="text"
              maxLength="300"
              onChange={handleChange}
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
        </form>
      )}
    </Formik>
  );
};

export default Registration;
