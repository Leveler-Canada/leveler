import React from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const Comment = (props) => (
  <>
    <Formik
      initialValues={{ text: '' }}
      validationSchema={Yup.object({
        text: Yup.string()
          .trim()
          .max(1000)
          .required('an email is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // props.loginUser(values);
          setSubmitting(false);
        }, 0);
      }}
    >
      <Form className="auth-form">
        <Field name="text" type="text" component="textarea" />
        <button type="submit">add comment</button>
        {props.error && <div><span>{props.error}</span></div>}
      </Form>
    </Formik>
  </>

);

export default Comment;
