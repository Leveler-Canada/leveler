import React from 'react';
import ResourceItem from '../Resources/ResourceItem';
import { withAuthentication } from '../Session';

const CommentModal = (props) => {
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
            />
          </div>
          <div className="modal-overlay" onClick={() => props.toggleModal()} />
        </>
      ) : null}
    </>
  );
};

export default withAuthentication(CommentModal);
