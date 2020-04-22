import React, { useState, useEffect } from 'react';
import zip from 'lodash/zip';
import ResourceItem from '../Resources/ResourceItem';
import Comment from '../Form/Comment';
import { withAuthentication } from '../Session';

const CommentModal = (props) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const {
      dbFs, resourcesCollection,
    } = props.firebase;

    const getComments = async () => {
      const {
        commentsCollection,
      } = props.firebase;

      try {
        const querySnapshot = await commentsCollection
          .where('parent', '==', id)
          .orderBy('score', 'desc')
          .get();

        const snapshots = [];
        querySnapshot.forEach((documentSnapshot) => {
          snapshots.push(documentSnapshot);
        });
        console.log(snapshots);


        // const commentsArr = await Promise.all(snapshots.map(getComments));
        // const result = zip(snapshots, commentsArr).map((item) => {
        //   const [snap, comment] = item;
        //   const data = snap.data();
        //   data._path = snap.ref.path;
        //   data.commentsArr = comment;
        //   return data;
        // });
        // setComments(commentsArr);
        // return result;
      } catch (e) {
        console.log(e.message);
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
            <Comment />
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
