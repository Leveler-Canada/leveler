import React, { useState } from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const SignUp = (props) => (
  <>
    <h4>Sign Up</h4>
    <p>signing up will allow you to submit links and comments</p>
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, 'username must be atleast 3 characters')
          .required('a username is required'),
        email: Yup.string()
          .email().trim()
          .required('an email is required'),
        password: Yup.string()
          .min(8, 'password must be atleast 8 characters')
          .required('password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          props.signUpUser(values);
          setSubmitting(false);
        }, 0);
      }}
    >
      <Form className="auth-form">
        <Field name="username" type="text" placeholder="username" />
        <ErrorMessage component="span" name="username" />
        <Field name="email" type="text" placeholder="email" />
        <ErrorMessage component="span" name="email" />
        <Field name="password" type="password" placeholder="password" />
        <button type="submit">Sign Up</button>
        {props.error && <div><span>{props.error}</span></div>}
      </Form>
    </Formik>
  </>

);

export default SignUp;
