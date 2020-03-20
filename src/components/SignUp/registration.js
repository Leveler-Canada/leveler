import React from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import FormikPlacesAutocomplete from "./FormikPlacesAutocomplete.jsx";

const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    industry: Yup.string().min(1),
    location: Yup.object(),
    social_url: Yup.string().url()
});

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
          suggestion: ""
>>>>>>> added constants/signupForm.js to eventually take out all static data in registration.js, updated value 'situation_descriotion' to just 'description'
        }}
      validationSchema={validationSchema}
      onSubmit={values => {
        values.timestamp = new Date().toISOString();
        if(values.industry === 'other'){
            values.industry = values.other_industry;
            delete values.other_industry;
        }
        console.log(values);
        // pushes into 'entries' node in firebase
        props.firebase.entriesNode().push(values)
      }}
    >
        {({ handleSubmit, handleChange, values, errors }) => (
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
            <label htmlFor="location">*location</label>
            <span className="description">begin typing your city to select the appropriate state and/or country</span>
            <Field name="location" component={FormikPlacesAutocomplete} />
          </fieldset>
          <fieldset>
            <label>Industry</label>
            <Field as="select" name="industry">
              <option value="">----</option>
              <option value="Nightlife">Nightlife</option>
              <option value="Arts">Arts</option>
              <option value="Music">Music</option>
              <option value="Production">Production</option>
              <option value="Food Service">Food Service & Hospitality</option>
              <option value="Other">Not listed here</option>
            </Field>
            {values.industry === "Other" && (
              <div>
                  <label>Industry Name</label>
                  <input type="text" onChange={handleChange} value={values.custom_industry} name="other_industry"></input>
              </div>
            )}
          </fieldset>
          <fieldset>
            <label>*context</label>
            <span className="description">tell us what you feel comfortable sharing about your situation</span>
            <input
              type="text"
              onChange={handleChange}
              value={values.description}
              name="description"
            />
          </fieldset>
          <fieldset>
            <div>
            <label>Enter your preferred payment methods</label>
            <Field type="checkbox" name="paypal"></Field>
            <label htmlFor="paypal">PayPal</label>
            {values.paypal && (
                <div>
                    <label>PayPal URL</label>
                    <input type="text" onChange={handleChange} value={values.paypal} name="paypal"></input>
                    {errors.paypal}
                </div>
            )}
            <Field type="checkbox" name="venmo"></Field>
            <label htmlFor="venmo">venmo</label>
            {values.venmo && (
                <div>
                    <label>venmo URL</label>
                    <input type="text" onChange={handleChange} value={values.venmo} name="venmo"></input>
                    {errors.venmo}
                </div>
            )}
            <Field type="checkbox" name="cashapp"></Field>
            <label htmlFor="cashapp">cashapp</label>
            {values.cashapp && (
                <div>
                    <label>cashapp URL</label>
                    <input type="text" onChange={handleChange} value={values.cashapp} name="cashapp"></input>
                    {errors.cashapp}
                </div>
            )}
            <Field type="checkbox" name="patreon"></Field>
            <label htmlFor="patreon">patreon</label>
            {values.patreon && (
                <div>
                    <label>patreon URL</label>
                    <input type="text" onChange={handleChange} value={values.patreon} name="patreon"></input>
                    {errors.patreon}
                </div>
            )}
            </div>
          </fieldset>
          <fieldset>
            <label htmlFor="social_url">A URL where we can find you on social media</label>
            <input
              type="text"
              onChange={handleChange}
              value={values.social_url}
              name="social_url"
            />
            {errors.social_url}
          </fieldset>
          <fieldset>
            <label>Any suggestions for us?</label>
            <input
              type="text"
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