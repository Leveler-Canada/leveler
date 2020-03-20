import React from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import FormikPlacesAutocomplete from "./FormikPlacesAutocomplete.jsx";
import classNames from 'classnames';

const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    industry: Yup.string().min(1),
    location: Yup.object(),
    social_url: Yup.string().url(),
    payment: Yup.string().url().required("Required"),
    payment_2: Yup.string().url(),
    payment_3: Yup.string().url()
});

function successHandler(payload) {
  alert("Data successfully submitted.");
}

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

const Registration = (props) => (
    <Formik
      initialValues={{ 
          email: "", 
          timestamp: "", 
          industry: "",
<<<<<<< HEAD
          situation_description: "",
          suggestion: "",
          social_url: "",
          payment_methods: {}
=======
          description: "",
          payment_method: [],
<<<<<<< HEAD
          suggestion: ""
>>>>>>> added constants/signupForm.js to eventually take out all static data in registration.js, updated value 'situation_descriotion' to just 'description'
=======
          suggestion: "",
>>>>>>> changed industry to radio button
        }}
      validationSchema={validationSchema}
      onSubmit={values => {
        if(values.industry === 'other'){
            values.industry = values.other_industry;
            delete values.other_industry;
        }
        values.payment_method = [values.payment]
        if (values.payment_2) {
          values.payment_method.push(values.payment_2);
          delete values.payment_2;
        }
        if (values.payment_3) {
          values.payment_method.push(values.payment_3)
          delete values.payment_3;
        } 
        var payload = {
          entry: {
            description: values.description,
            email: values.email,
            industry: values.industry,
            location: values.location,
            payment_url: values.payment_method,
            social_url: values.social_url
          },
          timestamp: new Date().toISOString(),
          random: "XXXXXXX"
        }
        console.log(payload);
        // pushes into 'entries' collection in firebase
        props.firebase.entriesNode().push(payload, function (error) {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            successHandler(payload);
          }
        });
      }}
    >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
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
            <span className="description">begin typing your city to select the appropriate state and/or country</span>
            <Field name="location" component={FormikPlacesAutocomplete} />
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
              id="arts"
              label="arts"
            />
            <Field
              component={RadioButton}
              name="industry"
              id="nightlife"
              label="nightlife"
            />
            <Field
              component={RadioButton}
              name="industry"
              id="production"
              label="production"
            />
            <Field
              component={RadioButton}
              name="industry"
              id="food_service"
              label="hospitality"
            />
            <Field
              component={RadioButton}
              name="industry"
              id="music"
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
                  <input type="text" onChange={handleChange} value={values.custom_industry} name="other_industry" placeholder="other industry here"></input>
              </div>
            )}
          </RadioButtonGroup>
          <fieldset>
            <label>context*</label>
            <span className="description">tell us what you feel comfortable sharing about your situation</span>
            <textarea
              type="text"
              maxLength="300"
              onChange={handleChange}
              value={values.description}
              name="description"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="payment">payment*</label>
            <span className="description">please post the full public url to your preferred payment method(s)</span>
            <input type="text" onChange={handleChange} value={values.payment} name="payment"></input>
            <span className="error">{errors.payment}</span>
            <input type="text" onChange={handleChange} value={values.payment_2} name="payment_2" className="hidden"></input>
            <span className="error">{errors.payment_2}</span>
            <input type="text" onChange={handleChange} value={values.payment_3} name="payment_3" className="hidden"></input>
            <span className="error">{errors.payment_3}</span>
          </fieldset>
          <fieldset>
            <label htmlFor="social_url">social</label>
            <span className="description">please provide full url for your social media handle. Will not be made public, however you may get DM'ed by an admin to verify your identity.</span>
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
            <span className="description">let us know if you see room for improvement or have ideas on how to help make leveler better.</span>
            <textarea
              type="text"
              maxLength="300"
              onChange={handleChange}
              value={values.suggestion}
              name="suggestion"
            />
          </fieldset>  
          <button className="btn" type="submit">Submit</button>
        </form>
      )}
    </Formik>
);

export default Registration;