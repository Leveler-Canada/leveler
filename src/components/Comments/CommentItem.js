/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommentForm from '../Form/Comment';
import { withAuthentication } from '../Session';
import usePersistedState from '../../utils/usePersistedState';

const CommentItem = ({
  comment, sub, authUser, userData, firebase, parent, handleNewComment,
}) => {
  const [didVote, setVote] = usePersistedState(`didVoteComment-${comment.path}`, null);
  const [score, setScore] = useState(comment.score);
  const [replyVisible, setReplyVisible] = useState(false);

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
      setScore(score + 1);
    } catch (e) {
      console.log(e.message);
    }
  };

  const renderCommentVotes = () => {
    if (userData) {
      if (userData.id !== comment.by && !didVote) {
        return (
          <>
            <button type="submit" onClick={() => updateCommentScore()}>⬆️</button>
            <p>{score}</p>
          </>
        );
      } if (userData.id === comment.by && !didVote) {
        return (
          <>
            <button>📝</button>
            <p>{score}</p>
          </>
        );
      } if (didVote) {
        return (
          <>
            <button type="submit">👍🏼</button>
            <p>{score}</p>
          </>
        );
      }
    }
  };

  return (
    <div className={`comment-container ${sub ? 'sub-comment' : ''}`}>
      <div className="comment-header">
        {renderCommentVotes()}
        <p>{comment.by}</p>
        {score > 1 ? (
          <p>
            {score}
            {' '}
            points
          </p>
        ) : (
          <p>
            {score}
            {' '}
            point
          </p>
        )}
      </div>
      <div className="comment-body">
        <p>{comment.text}</p>
      </div>
      <div className="comment-footer">
        {!replyVisible
        && (
        <button onClick={() => setReplyVisible(true)} className="btn" type="submit">
          reply
        </button>
        )}
        {replyVisible
        && (
        <CommentForm
          reply
          path={path}
          handleNewComment={handleNewComment}
          parent={parent}
        />
        )}
      </div>
      {comment.comments ? (comment.comments.map((subComment) => (
        <CommentItem
          sub
          key={path}
          authUser={authUser}
          comment={subComment}
          firebase={firebase}
          handleNewComment={handleNewComment}
          userData={userData}
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
  userData: PropTypes.shape({
    about: PropTypes.string,
    created: PropTypes.element,
    id: PropTypes.string,
    karma: PropTypes.number,
    submitted: PropTypes.array,
  }),
  sub: PropTypes.bool,
  handleNewComment: PropTypes.func.isRequired,
};

export default withAuthentication(CommentItem);
