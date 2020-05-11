/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { withAuthentication } from '../Session';

const errorStyle = {
  color: 'red',
  fontSize: '1rem',
};

const CommentForm = ({
  firebase, authUser, userData, path, handleNewComment, reply, parent,
}) => {
  const [didSubmit, setSubmit] = useState(false);

  const updateUser = async (commentId) => {
    const { fieldValue, userCollection } = firebase;
    try {
      await userCollection.doc(authUser.uid)
        .update({
          karma: fieldValue.increment(2),
          submitted: fieldValue.arrayUnion(commentId),
        });
    } catch (e) {
      console.log(e);
    }
  };

  const updateResourceDescendants = async () => {
    const { fieldValue, resourcesCollection } = firebase;
    const resourceRef = resourcesCollection.doc(parent);
    try {
      await resourceRef
        .update({
          descendants: fieldValue.increment(1),
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const writeComment = async (comment) => {
    const { dbFs } = firebase;
    // eslint-disable-next-line no-param-reassign
    path += '/comments';
    const {
      by, created, score, text,
    } = comment;
    try {
      const write = await dbFs.collection(path).add({
        by,
        created,
        score,
        text,
        parent,
      });
      await updateUser(write.id);

      const newComment = {
        by,
        created,
        score,
        text,
        path,
      };
      updateResourceDescendants();
      handleNewComment(newComment);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (values) => {
    const { text } = values;
    const { id } = userData;
    const { fieldValue } = firebase;

    const comment = {
      text,
      by: id,
      score: 1,
      created: fieldValue.serverTimestamp(),
    };

    writeComment(comment);
    values.text = '';
  };

  return (
    <>
      {!didSubmit
          && (
          <Formik
            initialValues={{ text: '' }}
            validationSchema={Yup.object({
              text: Yup.string()
                .trim()
                .min(10)
                .max(1000)
                .required('To submit, you have to actually write something!'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                onSubmit(values);
                setSubmitting(false);
                setSubmit(true);
              }, 0);
            }}
          >
            <Form className={`comment-form ${reply ? 'reply' : ''}`}>
              <Field
                name="text"
                type="text"
                component="textarea"
              />
              <button
                className="btn"
                type="submit"
              >
                add comment
              </button>
              <p style={errorStyle}><ErrorMessage name="text" /></p>
            </Form>
          </Formik>
          )}
      {didSubmit && !reply
        && (
        <div className="success-msg">
          <p>💭Thanks for sharing!🗣</p>
        </div>
        )}
    </>
  );
};

CommentForm.propTypes = {
  firebase: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  handleNewComment: PropTypes.func.isRequired,
  reply: PropTypes.bool,
};

export default withAuthentication(CommentForm);
