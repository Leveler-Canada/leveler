import React, { useState } from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { withAuthentication } from '../Session';
import AuthModal from '../Modal/AuthModal';

const group = process.env.REACT_APP_LEVELER_GROUP;

const AddResourceForm = ({ authUser, userData, firebase }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);

  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const onLoginClick = () => {
    toggleModal();
  };

  const categories = [
    'EMERGENCY FUNDING',
    'FUNDING OPPORTUNITIES',
    'CROWDFUNDING',
    'GRANT',
    'FUN',
    'DISCUSS',
  ];

  const updateUser = async (resourceId) => {
    const { fieldValue, userCollection } = firebase;
    try {
      await userCollection.doc(authUser.uid)
        .update({
          karma: fieldValue.increment(3),
          submitted: fieldValue.arrayUnion(resourceId),
        });
    } catch (e) {
      console.log(e);
    }
  };

  const writeToResources = async (writeObj) => {
    const { resourcesCollection } = firebase;

    try {
      const resourceWrite = await resourcesCollection
        .add(writeObj);
      if (resourceWrite) {
        updateUser(resourceWrite.id);
        setSubmittedForm(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const prepResourceObject = (valuesObj) => {
    let {
      title, url, category, text,
    } = valuesObj;
    const { fieldValue } = firebase;
    const { id } = userData;

    // TRIM WHITESPACE
    title = title.trim();
    url = url.trim();
    if (text) {
      text = text.trim();
    } else {
      text = '';
    }

    const writeObj = {
      created: fieldValue.serverTimestamp(),
      by: id,
      title,
      url,
      category,
      type: 'story',
      score: 1,
      descendants: 0,
      kids: null,
      parent: null,
      text,
      group: group,
    };
    writeToResources(writeObj);
  };

  return (
    <>
      {authUser && !submittedForm && (
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
              prepResourceObject(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="resource-form">
            <h4>Add a Resource</h4>
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
      )}

      {authUser && submittedForm && (
        <div className="submission-msg">
          <h3>You're done ✅</h3>
          <p>You'll see your post at the top of the list 🔼</p>
          <Link to="/resources"><button className="btn">back to resources</button></Link>
        </div>
      )}

      {!authUser && (
        <>
          <AuthModal
            isOpen={modalIsOpen}
            toggleModal={toggleModal}
            firebase={firebase}
          />
          <div className="login-prompt">
            <p>You have to be signed in to post!</p>
            <button onClick={onLoginClick} className="btn">log in</button>
          </div>
        </>
      )}

    </>
  );
};

export default withAuthentication(AddResourceForm);
