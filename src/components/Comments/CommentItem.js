/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import PropTypes from 'prop-types';
import { withAuthentication } from '../Session';
import usePersistedState from '../../utils/usePersistedState';

const CommentItem = ({
  comment, sub, authUser, firebase,
}) => {
  const [didVote, setVote] = usePersistedState(`didVote-${comment.path}`, null);

  const { path } = comment;

  const {
    dbFs,
    fieldValue,
    userCollection,
  } = firebase;

  const updateUserKarma = async () => {
    const { uid } = authUser;
    const userRef = userCollection.doc(uid);

    try {
      await userRef
        .update({
          karma: fieldValue.increment(1),
        });
    } catch (e) {
      console.log(e);
    }
  };

  const updateCommentScore = async () => {
    try {
      await dbFs
        .doc(path)
        .update({
          score: fieldValue.increment(1),
        });
      updateUserKarma();
      setVote(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={`comment-container ${sub ? 'sub-comment' : ''}`}>
      <div className="comment-header">
        {!didVote && <button type="button" onClick={() => updateCommentScore()}>⬆️</button>}
        {didVote && <p>👍🏼</p>}
        <p>{comment.by}</p>
        <p>1 min ago</p>
      </div>
      <div className="comment-body">
        <p>{comment.text}</p>
      </div>
      {comment.comments ? (comment.comments.map((subComment) => (
        <CommentItem
          sub
          authUser={authUser}
          comment={subComment}
          firebase={firebase}
        />
      )))
        : null}
    </div>
  );
};

CommentItem.propTypes = {
  firebase: PropTypes.object.isRequired,
  comment: PropTypes.shape({
    created: PropTypes.any,
    by: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  authUser: PropTypes.object.isRequired,
  sub: PropTypes.bool.isRequired,
};

export default withAuthentication(CommentItem);
