/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import { withFirebase } from '../Firebase';

const ResourceItem = (props) => {
 
	return (
	<div id={props.id} className="resources-item-container">
		<div className="resources-item-votes">
			{!props.active && 
				<>
					<button onClick={() => props.upvote(props.index, props.score + 1)}>⬆️</button>
					<p>{props.score}</p>
					<button>💬</button>
				</>}
			{props.active && 
				<>
					<p>👍🏼 {props.score}</p>
					<button>💬</button>
				</>}
		</div>
		<div className="resources-item-title">
			<a 
				href={props.url}
				target="_blank"
				rel="noopener noreferrer">
				{props.title}
			</a>
			<p>by {props.createdBy}, {props.created}</p>
		</div>
	</div>
	)
}
export default withFirebase(ResourceItem);