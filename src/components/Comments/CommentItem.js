import React, { useState } from 'react';
import { withAuthentication } from '../Session';

const CommentItem = (props) => {
  // const [comments, setComments] = useState(null);

  const {
    upvote,
    logEvent,
    comment,
  } = props;

  return (
    <div className="comment-container">
      <div className="comment-header">
        <button>⬆️</button>
        <p>{comment.by}</p>
        <p>1 min ago</p>
      </div>
      <div className="comment-body">
        <p>{comment.text}</p>
      </div>
      {comment.comments ? (comment.comments.map((comment) => <CommentItem comment={comment} />)) : null}
    </div>
  );
};

export default withAuthentication(CommentItem);
