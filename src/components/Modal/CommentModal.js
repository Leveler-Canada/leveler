import React, { useState, useEffect } from 'react';
import zip from 'lodash/zip';
import ResourceItem from '../Resources/ResourceItem';
import CommentForm from '../Form/Comment';
import { withAuthentication } from '../Session';

const CommentModal = (props) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const { dbFs } = props.firebase;

    const getComments = async () => {
      const comments = await getCommentsHelper(path);
      setComments(comments);
    };

    const getCommentsHelper = async (docPath) => {
      try {
        let querySnapshot = await dbFs.collection(`${docPath}/comments`).orderBy('score', 'desc').get();

        let snapshots = [];
        querySnapshot.forEach((documentSnapshot) => {
          snapshots.push(documentSnapshot);
        });

        let responses = await Promise.all(snapshots.map((snapshot) => getCommentsHelper(snapshot.ref.path)));
        const result = zip(snapshots, responses).map((item) => {
          const [snapshot, comments] = item;
          let data = snapshot.data();
          data.path = snapshot.ref.path;
          data.comments = comments;
          return data;
        });
        return result;
      } catch(e) {
        console.error(e.message);
      }
    };

    if (isOpen) {
      getComments();
    }
  }, [props.isOpen]);

  const {
    id,
    title,
    score,
    url,
    by,
    created,
    category,
    kids,
    descendants,
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
                ? (comments.map((comment) => <li>{comment.text}</li>)) : null}
            </div>
          </div>
          <div className="modal-overlay" onClick={() => props.toggleModal()} />
        </>
      ) : null}
    </>
  );
};

export default withAuthentication(CommentModal);
