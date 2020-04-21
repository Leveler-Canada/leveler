/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import CommentModal from '../Modal/CommentModal';

const ResourceItem = (props) => {
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
    active,
    upvote,
    index,
    logEvent,
    getByCategory,
    linkClicked,
    view,
  } = props;

  const [modalIsOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const onCommentsClick = () => {
    logEvent('resource_item_comments_clicked');
    toggleModal();
  };

  return (
    <>
      <CommentModal
        isOpen={modalIsOpen}
        toggleModal={toggleModal}
        item={props.item}
      />
      <div id={id} className="resources-item-container">
        <div className="resources-item-votes">
          {!active && (
          <>
            <button onClick={() => upvote(index, score + 1)}>⬆️</button>
            <p>{score}</p>
          </>
          )}
          {active && (
          <>
            <button>👍🏼</button>
            <p>{score}</p>

          </>
          )}
        </div>
        <div className="resources-item-title">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => linkClicked(url)}
          >
            {title}
          </a>
          <a
            id="comments"
            to="/comments"
            onClick={onCommentsClick}
          >
            (49)💬
          </a>
          <div className="resources-item-footer">
            <p>
              by
              {' '}
              {by}
              ,
              {' '}
              {created}
            </p>
          </div>
          {view !== 'comment'
          && (
          <div className="resources-item-category-mobile">
            <button onClick={() => getByCategory(category)}><b>{category}</b></button>
          </div>
          )}
        </div>
        {view !== 'comment'
        && (
        <div className="resources-item-category-desktop">
          <button onClick={() => getByCategory(category)}><b>{category}</b></button>
        </div>
        )}
      </div>
    </>
  );
};
export default ResourceItem;
