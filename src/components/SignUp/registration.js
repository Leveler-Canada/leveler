import React from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    city: Yup.string().required("Required"),
    state_or_country: Yup.string().min(1).required("Required"),
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
          city: "",
          state_or_country: "", 
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
            <label htmlFor="email">Email</label>  
            <input
              type="text"
              onChange={handleChange}
              value={values.email}
              name="email"
            />
            {errors.email}
            <label htmlFor="city">City</label>
            <input
              type="text"
              onChange={handleChange}
              value={values.city}
              name="city"
            />
            {errors.city}
            <label htmlFor="state_or_country">State (or Country)</label>
            <Field as="select" name="state_or_country">
              <option value="">----</option>
              <option value="AL">Alabama</option>
	            <option value="AK">Alaska</option>
	            <option value="AZ">Arizona</option>
	            <option value="AR">Arkansas</option>
	            <option value="CA">California</option>
	            <option value="CO">Colorado</option>
	            <option value="CT">Connecticut</option>
	            <option value="DE">Delaware</option>
	            <option value="DC">District of Columbia</option>
	            <option value="FL">Florida</option>
	            <option value="GA">Georgia</option>
	            <option value="HI">Hawaii</option>
	            <option value="ID">Idaho</option>
	            <option value="IL">Illinois</option>
	            <option value="IN">Indiana</option>
	            <option value="IA">Iowa</option>
	            <option value="KS">Kansas</option>
	            <option value="KY">Kentucky</option>
	            <option value="LA">Louisiana</option>
	            <option value="ME">Maine</option>
	            <option value="MD">Maryland</option>
	            <option value="MA">Massachusetts</option>
	            <option value="MI">Michigan</option>
	            <option value="MN">Minnesota</option>
	            <option value="MS">Mississippi</option>
	            <option value="MO">Missouri</option>
	            <option value="MT">Montana</option>
	            <option value="NE">Nebraska</option>
	            <option value="NV">Nevada</option>
	            <option value="NH">New Hampshire</option>
	            <option value="NJ">New Jersey</option>
	            <option value="NM">New Mexico</option>
	            <option value="NY">New York</option>
	            <option value="NC">North Carolina</option>
	            <option value="ND">North Dakota</option>
	            <option value="OH">Ohio</option>
	            <option value="OK">Oklahoma</option>
	            <option value="OR">Oregon</option>
	            <option value="PA">Pennsylvania</option>
	            <option value="RI">Rhode Island</option>
	            <option value="SC">South Carolina</option>
	            <option value="SD">South Dakota</option>
	            <option value="TN">Tennessee</option>
	            <option value="TX">Texas</option>
	            <option value="UT">Utah</option>
	            <option value="VT">Vermont</option>
	            <option value="VA">Virginia</option>
	            <option value="WA">Washington</option>
	            <option value="WV">West Virginia</option>
	            <option value="WI">Wisconsin</option>
	            <option value="WY">Wyoming</option>
            </Field>
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