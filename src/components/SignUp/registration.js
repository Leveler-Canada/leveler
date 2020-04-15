/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import FormikPlacesAutocomplete from './FormikPlacesAutocomplete.jsx';
import PaymentInstruction from '../Modal/PaymentInstruction.js';
import RadioButton from './RadioButton';
import RadioButtonGroup from './RadioButtonGroup';
import localizationBundle from '../../constants/dictionary';

const REQUIRED_ERROR = 'necesario';

const addURLScheme = (url) => (/^https?:\/\//.test(url) ? url : `https://${url}`);

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required(REQUIRED_ERROR),
  industry: Yup.string().min(1),
  description: Yup.string().min(1).required(REQUIRED_ERROR),
  social_url: Yup.string()
    .transform(addURLScheme)
    .url('nosotros necesitamos una url'),
  payment: Yup.string()
    .transform(addURLScheme)
    .url('nosotros necesitamos una url de Paypal')
    .test('validPaymentLink', '', function (value) {
      if (!value) return false;

      const hostname = value.split('/')[2].toLowerCase();
      const path = value.split('/')[3];

      const [regex, errMsg] = (function (hostname) {
        switch (hostname) {
          case 'paypal.com':
          case 'www.paypal.com':
            return [/^$/, '⛔️ parece que tu link de Paypal no es correcto'];
          case 'paypal.me':
          case 'www.paypal.me':
            return [/^.+$/, '⛔️ parece que tu link de Paypal no es correcto'];
          default:
            return [null, '⛔️ parece que tu link de pago no es correcto - nosotros solo apoyamos Paypal'];
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

  // ADD ENTRY TO entriesIndex UPON SUBMISSION
  const addToEntriesIndex = (entriesIndexPayload, entriesIndexCollection) => {
    const { id } = entriesIndexCollection.doc();
    entriesIndexCollection.doc(id).set(entriesIndexPayload);
  };

  const updateLastSignup = async (updated) => {
    const { miscCollection } = props.firebase;
    try {
      await miscCollection.doc('lastSignup').update({
        updated,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    if (values.industry === 'other') {
      values.industry = values.other_industry;
      delete values.other_industry;
    }
    values.payment = addURLScheme(values.payment);
    const { entriesCollection, fieldValue } = props.firebase;

    try {
      await entriesCollection
        .add({
          location: values.location,
          industry: values.industry.trim(),
          description: values.description.trim(),
          payment_url: [values.payment],
          suggestion: values.suggestion.trim(),
          shown: 0,
          potential_contrib: 0,
          random: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        })
        .then((docRef) => {
          docRef.collection('private').add({
            email: values.email.trim(),
            social_url: values.social_url.trim(),
          });
        });

      updateLastSignup(fieldValue.serverTimestamp());
      resetForm({});
      setSubmitted(true);
    } catch (e) {
      console.error(e.message);
    }
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
            <label htmlFor="email">email:*</label>
            <span className="error">{errors.email}</span>
            <input
              type="text"
              onChange={handleChange}
              value={values.email}
              name="email"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="location">
              {localizationBundle.registrationPage.location}
              *
            </label>
            <span className="description">
              {localizationBundle.registrationPage.locationDescription}
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
            label={`${localizationBundle.registrationPage.industry}*`}
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
              label={`${localizationBundle.registrationPage.nightLife}`}
            />
            <Field
              component={RadioButton}
              name="industry"
              id="Production"
              label={`${localizationBundle.registrationPage.production}`}
            />
            <Field
              component={RadioButton}
              name="industry"
              id="Food Service/Hospitality"
              label={`${localizationBundle.registrationPage.hospitality}`}
            />
            <Field
              component={RadioButton}
              name="industry"
              id="Music"
              label={`${localizationBundle.registrationPage.music}`}
            />
            <Field
              component={RadioButton}
              name="industry"
              id="other"
              label={`${localizationBundle.registrationPage.other}`}
            />
            {values.industry === 'other' && (
            <div>
              <input
                type="text"
                onChange={handleChange}
                value={values.custom_industry}
                name="other_industry"
                placeholder={`${localizationBundle.registrationPage.otherPlaceHolder}`}
              />
            </div>
            )}
          </RadioButtonGroup>
          <fieldset>
            <label>
              {localizationBundle.registrationPage.context}
              *
            </label>
            <span className="description">
              {localizationBundle.registrationPage.contextDescription}
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
            <label htmlFor="payment">
              {localizationBundle.registrationPage.payment}
              *
            </label>
            <span className="description">
              {localizationBundle.registrationPage.paymentURL}
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
                <button className="instructions-btn" onClick={openModal}>Instrucciones</button>
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
            <label htmlFor="social_url">{localizationBundle.registrationPage.social}</label>
            <span className="description">
              {localizationBundle.registrationPage.socialDescription}
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
            <label>{localizationBundle.registrationPage.suggestions}</label>
            <span className="description">
              {localizationBundle.registrationPage.suggestionsDescription}
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
            {localizationBundle.registrationPage.submit}
          </button>
          {submitted ? <Redirect to="/success" /> : null}
        </form>
      )}
    </Formik>
  );
};

export default Registration;
