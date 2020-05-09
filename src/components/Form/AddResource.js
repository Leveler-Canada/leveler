import React from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { withAuthentication } from '../Session';

const AddResourceForm = () => {
  const categories = [
    'EMERGENCY FUNDING',
    'FUNDING OPPORTUNITIES',
    'CROWDFUNDING',
    // 'JOB',
    // 'FREELANCE',
    // 'GIG',
    'GRANT',
    'FUN',
    'DISCUSS',
  ];

  // const prepResourceObject = (valuesObj) => {
  //   const { title, url, category } = valuesObj;
  //   const { fieldValue } = this.props.firebase;
  //   // change
  //   const { username } = this.state;

  //   const writeObj = {
  //     created: fieldValue.serverTimestamp(),
  //     by: username,
  //     title,
  //     url,
  //     category,
  //     type: 'story',
  //     score: 0,
  //     descendants: null,
  //     kids: null,
  //     parent: null,
  //     text: null,
  //   };
  //   writeToResources(writeObj);
  // };
  return (
    <Formik
      initialValues={{ title: '', url: '', category: '' }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(100, 'Must be 100 characters or less')
          .required('A Title is required'),
        category: Yup.string()
          .required('A Category is required'),
        url: Yup.string(),
        text: Yup.string()
          .max(500, 'Must be 500 characters or less'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // prepResourceObject(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="resource-form">
        <label htmlFor="title">title*</label>
        <Field name="title" type="text" />
        <ErrorMessage component="span" name="title" />
        <label htmlFor="category">category*</label>
        <Field name="category" as="select">
          <option value="">select a category</option>
          {categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </Field>
        <ErrorMessage component="span" name="category" />
        <label htmlFor="url">
          url
          {' '}
          <span>(optional)</span>
        </label>
        <Field name="url" type="text" />
        <ErrorMessage component="span" name="url" />
        <label htmlFor="text">
          description
          {' '}
          <span>(optional)</span>
        </label>
        <Field name="text" type="text" component="textarea" />
        <ErrorMessage component="span" name="text" />
        <button type="submit" className="btn">Submit</button>
      </Form>
    </Formik>
  );
};

export default withAuthentication(AddResourceForm);
