import React from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import FormikPlacesAutocomplete from "./FormikPlacesAutocomplete.jsx";

const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    industry: Yup.string().min(1),
    paypal: Yup.string().url(),
    venmo: Yup.string().url(),
    cashapp: Yup.string().url(),
    patreon: Yup.string().url(),
    social_url: Yup.string().url()
});

const Registration = (props) => (
    <Formik
      initialValues={{ 
          email: "", 
          timestamp: "", 
          industry: "",
          description: "",
          suggestion: ""
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
            <label htmlFor="email">Email</label>  
            <input
              type="text"
              onChange={handleChange}
              value={values.email}
              name="email"
            />
            {errors.email}
            <label htmlFor="location">Location</label>
            <Field name="location" component={FormikPlacesAutocomplete} />
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
            <label>Describe your situation</label>
            <input
              type="text"
              onChange={handleChange}
              value={values.description}
              name="description"
            />
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
            <label htmlFor="social_url">A URL where we can find you on social media</label>
            <input
              type="text"
              onChange={handleChange}
              value={values.social_url}
              name="social_url"
            />
            {errors.social_url}
            <label>Any suggestions for us?</label>
            <input
              type="text"
              onChange={handleChange}
              value={values.suggestion}
              name="suggestion"
            />
            <button className="btn" type="submit">Submit</button>
        </form>
      )}
    </Formik>
);

export default Registration;