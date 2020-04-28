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
  firebase, authUser, userData, path, handleNewComment, reply,
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
      setSubmit(true);
    } catch (e) {
      console.log(e);
    }
  };

  const writeComment = async (comment) => {
    const { dbFs } = firebase;
    // eslint-disable-next-line no-param-reassign
    path += '/comments';
    console.log(path, 'path');
    const {
      by, created, score, text,
    } = comment;
    console.log(comment, 'ln.41');
    try {
      const write = await dbFs.collection(path).add({
        by,
        created,
        score,
        text,
      });
      await updateUser(write.id);
      console.log('u made it to area 51');
      const newComment = {
        by,
        created,
        score,
        text,
        path,
      };
      console.log(newComment, 'newComment');
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
          <p>
            (👀 look for your comment near the bottom, as comments are sorted by score)
          </p>
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
