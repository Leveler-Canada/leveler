/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import { withFirebase } from '../Firebase';

const ResourceItem = (props) => {

	return (
	<div id={props.id} className="resources-item-container">
		<div className="resources-item-votes">
			{/* <span onClick={() => this.onPaymentLinkClick(link)}> */}
			<button onClick={() => props.upvote(props.index, props.score + 1)}>⬆️</button><p>{props.score}</p>
		</div>
		<div className="resources-item-title">
			<a href={props.url}>{props.title}</a>
		</div>
		<div className="resources-item-detail">
			<p>posted by {props.createdBy}, 2 days ago</p>
		</div>
	</div>
	)
}
export default withFirebase(ResourceItem);