import React from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import FormikPlacesAutocomplete from "./FormikPlacesAutocomplete.jsx";

const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    industry: Yup.string().min(1),
    location: Yup.object(),
    social_url: Yup.string().url(),
    payment: Yup.string().url().required("Required"),
    payment_2: Yup.string().url(),
    payment_3: Yup.string().url()
});

const Registration = (props) => (
    <Formik
      initialValues={{ 
          email: "", 
          timestamp: "", 
          industry: "",
          description: "",
          payment_method: [],
          suggestion: ""
        }}
      validationSchema={validationSchema}
      onSubmit={values => {
        values.timestamp = new Date().toISOString();
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
            <label htmlFor="location">location*</label>
            <span className="description">begin typing your city to select the appropriate state and/or country</span>
            <Field name="location" component={FormikPlacesAutocomplete} />
          </fieldset>
          <fieldset>
            <label>industry*</label>
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
                  <label>industry name</label>
                  <input type="text" onChange={handleChange} value={values.custom_industry} name="other_industry"></input>
              </div>
            )}
          </fieldset>
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
            {errors.social_url}
          </fieldset>
          <fieldset>
            <label>suggestions</label>
            <span className="description">let us know if you see room for improvement or have ideas on how to help make leveler better.</span>
            <textarea
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