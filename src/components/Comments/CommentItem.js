import React, { useState } from 'react';
import { withAuthentication } from '../Session';

const CommentItem = (props) => {
  const [didVote, setVote] = useState(false);

  const {
    logEvent,
    comment,
  } = props;

  const updateUserKarma = async () => {
    const { fieldValue, userCollection } = props.firebase;
    const { uid } = props.authUser;
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
    const { fieldValue, dbFs } = props.firebase;
    const { path } = props.comment;
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
    <div className={`comment-container ${props.sub ? 'sub-comment' : ''}`}>
      <div className="comment-header">
        {!didVote && <button onClick={() => updateCommentScore()}>⬆️</button>}
        {didVote && <p>👍🏼</p>}
        <p>{comment.by}</p>
        <p>1 min ago</p>
      </div>
      <div className="comment-body">
        <p>{comment.text}</p>
      </div>
      {comment.comments ? (comment.comments.map((comment) => <CommentItem sub comment={comment} />)) : null}
    </div>
  );
};

export default withAuthentication(CommentItem);
