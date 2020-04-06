/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { withFirebase } from '../Firebase';

const ResourceItem = (props) => (
  <div>
    <div id={props.id} className="resources-item-container">
      <div className="resources-item-votes">
        {!props.active && (
        <>
          <button onClick={() => props.upvote(props.index, props.score + 1)}>⬆️</button>
          <p>{props.score}</p>
        </>
        )}
        {props.active && (
        <>
          <button>👍🏼</button>
          <p>{props.score}</p>

        </>
        )}
      </div>
      <div className="resources-item-title">
        <a
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.title}
        </a>
        <div className="resources-item-footer">
          <p>
            by
            {' '}
            {props.by}
            ,
            {' '}
            {props.created}
          </p>
        </div>
      </div>
      <div className="resources-item-category-desktop">
        <button onClick={() => props.getByCategory(props.category)}><b>{props.category}</b></button>
      </div>
    </div>
    <div className="resources-item-category-mobile">
      <button onClick={() => props.getByCategory(props.category)}><b>{props.category}</b></button>
    </div>
  </div>
);
export default withFirebase(ResourceItem);
