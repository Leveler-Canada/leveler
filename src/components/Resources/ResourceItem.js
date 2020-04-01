/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import { withFirebase } from '../Firebase';

const ResourceItem = (props) => {
 
	return (
	<div id={props.id} className="resources-item-container">
		<div className="resources-item-votes">
		{!props.active && <><p onClick={() => props.upvote(props.index, props.score + 1)}>⬆️</p><p>{props.score}</p></>}
		{props.active && <><p>👍🏼 {props.score}</p></>}
		</div>
		<div className="resources-item-title">
			<a 
				href={props.url}
				target="_blank"
				rel="noopener noreferrer">
				{props.title}
			</a>
		</div>
		<div className="resources-item-detail">
			<p>posted by {props.createdBy}, {props.created}</p>
			<button>💬</button>
		</div>
	</div>
	)
}
export default withFirebase(ResourceItem);