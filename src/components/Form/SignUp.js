import React from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const checkUsername = async (entry, fb) => {
  const { userCollection } = fb;
  const result = await userCollection.where('id', '==', entry).get();
  return result.empty;
};

const SignUp = ({ signUpUser, error, firebase }) => (
  <>
    <h4>Sign Up</h4>
    <p>signing up will allow you to submit links and comments</p>
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, 'username must be atleast 3 characters')
          .test('username-taken', 'this username is taken', (value) => checkUsername(value, firebase))
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
          signUpUser(values);
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
        <ErrorMessage component="span" name="password" />
        <button type="submit">Sign Up</button>
        {error && <div><span>{error}</span></div>}
      </Form>
    </Formik>
  </>

);

export default SignUp;
