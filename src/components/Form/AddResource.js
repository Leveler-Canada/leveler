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
          .required('Required'),
        url: Yup.string()
          .required('Required'),
        text: Yup.string()
          .max(500, 'Must be 500 characters or less'),
        category: Yup.string()
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // prepResourceObject(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="resource-form">
        <label htmlFor="title">Title</label>
        <Field name="title" type="text" />
        <ErrorMessage component="span" name="title" />
        <label htmlFor="url">URL</label>
        <Field name="url" type="text" />
        <ErrorMessage component="span" name="url" />
        <label htmlFor="text">description</label>
        <Field name="text" type="text" component="textarea" />
        <ErrorMessage component="span" name="text" />
        <label htmlFor="category">Category</label>
        <Field name="category" as="select">
          <option value="">select a category</option>
          {categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </Field>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default withAuthentication(AddResourceForm);
