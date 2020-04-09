import React, { useState } from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const Login = (props) => (
  <>
    <h4>Log In</h4>
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
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
        <Field name="email" type="text" placeholder="email" />
        <ErrorMessage component="span" name="email" />
        <Field name="password" type="password" placeholder="password" />

        <button type="submit">Log In</button>
      </Form>
    </Formik>
  </>

);

export default Login;
