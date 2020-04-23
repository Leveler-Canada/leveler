import React, { useState, useEffect } from 'react';
import zip from 'lodash/zip';
import ResourceItem from '../Resources/ResourceItem';
import CommentForm from '../Form/Comment';
import CommentItem from '../Comments/CommentItem';
import { withAuthentication } from '../Session';

const CommentModal = (props) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const { dbFs } = props.firebase;

    const getCommentsHelper = async (docPath) => {
      try {
        const querySnapshot = await dbFs.collection(`${docPath}/comments`).orderBy('score', 'desc').get();

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
  }, [props.isOpen]);

  const {
    id,
    path,
  } = props.item;

  const {
    item,
    active,
    upvote,
    index,
    logEvent,
    getByCategory,
    linkClicked,
    isOpen,
  } = props;
  return (
    <>
      {isOpen ? (
        <>
          <div className="modal">
            <h1>Comments</h1>
            <ResourceItem
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
              parent={id}
            />
            <div comments={comments}>
              {comments
                ? (comments.map((comment) => <CommentItem comment={comment} />)) : null}
            </div>
          </div>
          <div className="modal-overlay" onClick={() => props.toggleModal()} />
        </>
      ) : null}
    </>
  );
};

export default withAuthentication(CommentModal);
