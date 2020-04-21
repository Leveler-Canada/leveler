import React, { useState, useEffect } from 'react';
import { comment } from 'postcss-selector-parser';
import ResourceItem from '../Resources/ResourceItem';
import { withAuthentication } from '../Session';

const CommentModal = (props) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getComments = async () => {
      const {
        commentsCollection,
      } = props.firebase;
      try {
        const commentsObj = await commentsCollection
          .where('parent', '==', id)
          .get();
          // .then(((querySnapshot) => {
          //   console.log(querySnapshot);
          // }));
        if (commentsObj.docs.length > 0) {
          const commentsArr = [];
          commentsObj.docs.forEach(((doc) => {
            commentsArr.push(doc.data());
          }));
          setComments(commentsArr);
        }
      } catch (e) {
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
            {descendants ? (
              <div>
                comments
              </div>
						 ) : <>no comments yet</> }
          </div>
          <div className="modal-overlay" onClick={() => props.toggleModal()} />
        </>
      ) : null}
    </>
  );
};

export default withAuthentication(CommentModal);
