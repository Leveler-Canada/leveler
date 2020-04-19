import React from 'react';
import ResourceItem from "./ResourceItem";
import { withAuthentication } from '../Session';

const CommentItems = (props) => {
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
