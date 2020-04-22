import React from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { withAuthentication } from '../Session';

const Comment = (props) => {
  const updateUser = async (commentId) => {
    const { authUser } = props;
    const { fieldValue, userCollection } = props.firebase;
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

  const writeComment = async (comment) => {
    let { path } = props;
    const { dbFs } = props.firebase;
    path += '/comments';

    try {
      const write = await dbFs.collection(path).add({
        comment,
      });
      await updateUser(write.id);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (values) => {
    const { text } = values;
    const { id } = props.userData;
    const { parent } = props;
    const { fieldValue } = props.firebase;

    const comment = {
      text,
      by: id,
      score: 1,
      parent,
      created: fieldValue.serverTimestamp(),
    };

    writeComment(comment);
    values.text = '';
  };

  return (
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
          onSubmit(values);
          setSubmitting(false);
        }, 0);
      }}
    >
      <Form className="comment-form">
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
        <ErrorMessage name="text" />
      </Form>
    </Formik>
  );
};

export default withAuthentication(Comment);
