/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import CommentModal from '../Modal/CommentModal';
import usePersistedState from '../../utils/usePersistedState';

const ResourceItem = ({
  item, upvote, index, logEvent, getByCategory, linkClicked, view, userData, commentModalResource,
}) => {
  const [didVote, setVote] = usePersistedState(`didVoteLink-${item.id}`, null);

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
  } = item;

  const [modalIsOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const resourceUpvote = async () => {
    await upvote(index, score + 1);
    setVote(true);
  };

  const onCommentsClick = () => {
    logEvent('resource_item_comments_clicked');
    toggleModal();
  };

  const renderItemVotes = () => {
    if (userData) {
      if (userData.id !== by && !didVote) {
        return (
          <>
            <button type="submit" onClick={() => resourceUpvote()}>⬆️</button>
            <p>{score}</p>
          </>
        );
      } if (userData.id === by && !didVote) {
        return (
          <>
            <button>📝</button>
            <p>{score}</p>
          </>
        );
      } if (didVote) {
        return (
          <>
            <button type="submit">👍🏼</button>
            <p>{score}</p>
          </>
        );
      }
    }
  };

  return (
    <>
      <CommentModal
        isOpen={modalIsOpen}
        toggleModal={toggleModal}
        item={item}
        upvote={upvote}
        index={index}
      />
      <div key={id} className={`resources-item-container ${commentModalResource ? 'comment-modal-resource' : ''}`}>
        {/* <div key={id} className="resources-item-container"> */}
        <div className="resources-item-votes">
          {renderItemVotes()}
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
            (
            {descendants}
            )💬
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
