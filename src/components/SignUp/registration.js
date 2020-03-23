import React from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import FormikPlacesAutocomplete from "./FormikPlacesAutocomplete.jsx";
import classNames from "classnames";

const URL_REGEX = /^(?:https?:\/\/|s?ftps?:\/\/)?(?!www | www\.)[A-Za-z0-9_-]+\.+[A-Za-z0-9.\/%&=\?_:;-]+$/;
const REQUIRED_ERROR = "required";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().trim().required(REQUIRED_ERROR),
  industry: Yup.string().min(1),
  description: Yup.string().min(1).required(REQUIRED_ERROR),
  social_url: Yup.string().matches(URL_REGEX, "we need a real URL here"),
  payment: Yup.string().matches(URL_REGEX, "we need a real URL here").required(REQUIRED_ERROR)
});

// Input feedback
const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div className="radio-button-group">
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

// Radio group
const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children
}) => {
  const classes = classNames(
    "input-field",
    {
      "is-success": value || (!error && touched), // handle prefilled or user-filled
      "is-error": !!error && touched
    },
    className
  );

  return (
    <div className={classes}>
      <fieldset>
        <legend>{label}</legend>
        {children}
        {touched && <InputFeedback error={error} />}
      </fieldset>
    </div>
  );
};

const Registration = props => {
  const onSubmit = (values, { resetForm }) => {
    if (values.industry === "other") {
      values.industry = values.other_industry;
      delete values.other_industry;
    }
    values.payment_method = [values.payment];
    if (values.payment_2) {
      values.payment_method.push(values.payment_2);
      delete values.payment_2;
    }
    if (values.payment_3) {
      values.payment_method.push(values.payment_3);
      delete values.payment_3;
    }
    const { entriesCollection, entriesIndexCollection } = props.firebase;
    const random = entriesCollection.doc().id;
    const entriesCollectionPayload = {
      location: values.location.trim(),
      industry: values.industry.trim(),
      description: values.description.trim(),
      payment_url: values.payment_method,
      suggestion: values.suggestion.trim(),
      random: random,
      // TODO FORMAT created FOR FIREBASE
      // created: fieldValue.serverTimestamp(),
      created: new Date().toISOString()
    };
    const entriesIndexPayload = {
      parent_id: random,
      email: values.email.trim(),
      social_url: values.social_url.trim(),
      shown: 0,
      potential_contrib: 0,
      created: new Date().toISOString()
    }
    entriesCollection.doc(random).set(entriesCollectionPayload).then(() => {
      addToEntriesIndex(entriesIndexPayload, entriesIndexCollection);
    })
    resetForm({});
  };

  const addToEntriesIndex = (entriesIndexPayload, entriesIndexCollection) => {
    const id = entriesIndexCollection.doc().id;
    entriesIndexCollection.doc(id).set(entriesIndexPayload);
  }

  return (
    <Formik
      initialValues={{
        email: "",
        industry: "",
        description: "",
        payment: "",
        suggestion: "",
        location: "",
        social_url: ""
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
        isValid
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
            {values.industry === "other" && (
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  value={values.custom_industry}
                  name="other_industry"
                  placeholder="other industry here"
                ></input>
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
            ></input>
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
        </form>
      )}
    </Formik>
  );
};

export default Registration;
