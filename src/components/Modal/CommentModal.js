import React, { useState, useEffect } from 'react';
import zip from 'lodash/zip';
import ResourceItem from '../Resources/ResourceItem';
import CommentForm from '../Form/Comment';
import CommentItem from '../Comments/CommentItem';
import Loading from '../Animations/Loading';
import { withAuthentication } from '../Session';

const CommentModal = ({
  item,
  upvote,
  index,
  isOpen,
  firebase,
  toggleModal,
}) => {
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState(false);

  const handleNewComment = async (comment) => {
    if (comment) {
      comments.push(comment);
      setNewComment(true);
    }
    setNewComment(false);
  };

  useEffect(() => {
    // get initial comments
    const { dbFs } = firebase;

    const getCommentsHelper = async (docPath) => {
      try {
        const querySnapshot = await dbFs
          .collection(`${docPath}/comments`)
          .orderBy('score', 'desc')
          .get();

        const snapshots = [];
        querySnapshot.forEach((documentSnapshot) => {
          snapshots.push(documentSnapshot);
        });

        const responses = await Promise.all(snapshots.map((snapshot) => getCommentsHelper(snapshot.ref.path)));
        const result = zip(snapshots, responses).map((item) => {
          const [snapshot, comments] = item;
          const data = snapshot.data();
          data.path = snapshot.ref.path;
          data.comments = comments;
          return data;
        });
        return result;
      } catch (e) {
        console.error(e.message);
      }
    };

    const getComments = async () => {
      const commentsArr = await getCommentsHelper(path);
      setComments(commentsArr);
    };

    if (isOpen) {
      getComments();
    }
    if (newComment) {
      handleNewComment();
    }
  }, [isOpen, newComment]);

  const {
    id,
    path,
  } = item;

  return (
    <>
      {isOpen ? (
        <>
          <div className="modal">
            <h1>Comments</h1>
            <ResourceItem
              key={id}
              index={index}
              item={item}
              upvote={upvote}
              // getByCategory={getByCategory}
              // linkClicked={linkClicked}
              // logEvent={logEvent}
              view="comment"
              comments={comments}
              commentModalResource
            />
            <CommentForm
              path={path}
              handleNewComment={handleNewComment}
              parent={id}
            />
            <div className="comments-container">
              {comments
                ? (comments.map((comment) => <CommentItem key={comment.path} parent={id} handleNewComment={handleNewComment} comment={comment} />)) : <Loading height="70" width="70" />}
            </div>
          </div>
          <div className="modal-overlay" onClick={() => toggleModal()} />
        </>
      ) : null}
    </>
  );
};

export default withAuthentication(CommentModal);
