import React, { useState, useEffect } from 'react';
import zip from 'lodash/zip';
import ResourceItem from '../Resources/ResourceItem';
import CommentForm from '../Form/Comment';
import CommentItem from '../Comments/CommentItem';
import Loading from '../Animations/Loading';
import { withAuthentication } from '../Session';

const CommentModal = ({
  item,
  active,
  upvote,
  index,
  logEvent,
  getByCategory,
  linkClicked,
  isOpen,
  firebase,
  toggleModal,
}) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
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
      const comments = await getCommentsHelper(path);
      console.log(comments);
      setComments(comments);
    };

    if (isOpen) {
      getComments();
    }
  }, [isOpen]);

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
              active={active}
              getByCategory={getByCategory}
              linkClicked={linkClicked}
              logEvent={logEvent}
              view="comment"
              comments={comments}
            />
            <CommentForm
              path={path}
            />
            <div className="comments-container" comments={comments}>
              {comments
                ? (comments.map((comment) => <CommentItem key={comment.path} comment={comment} />)) : <Loading height="70" width="70" />}
            </div>
          </div>
          <div className="modal-overlay" onClick={() => toggleModal()} />
        </>
      ) : null}
    </>
  );
};

export default withAuthentication(CommentModal);
