import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import Header from '../Header';
import { Loading } from '../Animations'
import ResourceItem from './ResourceItem'
import FooterNav from '../FooterNav';

const ResourcesPage = () => (
	<div className="wrapper">
		<Header /> 		
		<ResourcesContainer />
		<FooterNav />
	</div>
)

const INITIAL_STATE = {
	links: [],
	loading: true
};

class ResourcesContainerBase extends Component {
	state = { ...INITIAL_STATE };

	componentDidMount() {
		this.getTopLinks()
	}

	async getTopLinks() {
		this.setState({
			loading: true
		})
		let links = [];
		const { resourcesCollection } = this.props.firebase;
		try {
			await resourcesCollection
				.where("type", "==", "story")
				.orderBy("score", "desc")
				.limit(30)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						let link = doc.data();
						link.id = doc.id;
						
						
						links.push(link)
					})
				})
				if (links) {
					this.setState({
						links,
						loading: false
					})
				}
		} catch(e) {
			console.log(e.message)
		}
	}

	async getNewLinks() {
		this.setState({
			loading: true
		})
		let links = [];
		const { resourcesCollection } = this.props.firebase;
		try {
			await resourcesCollection
				.where("type", "==", "story")
				.orderBy("created", "desc")
				.limit(30)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						let link = doc.data();
						link.id = doc.id;
						links.push(link)
					})
				})
				if (links) {
					this.setState({
						links,
						loading: false
					})
				}
		} catch(e) {
			console.log(e.message)
		}
	}

	render() {

		const upvote = async (index, score) => {
			const { fieldValue, resourcesCollection } = this.props.firebase;

			const { links } = this.state;
			links[index].score = score;
			links[index].active = true;
			await this.forceUpdate();
			// UPDATE DB SCORE
			const docRef = resourcesCollection.doc(links[index].id);
			try {
				await docRef.update({score: fieldValue.increment(1)});
			} catch (e) {
				console.log(e.message)
			}
		}

		return (
			<>
				<nav className="resources-header">
					<ul>
						<Link to="/">leveler</Link>
						<li onClick={() => {this.getTopLinks()}}>top</li>
						<li onClick={() => {this.getNewLinks()}}>new</li>
						<li>submit</li>
					</ul>
				</nav>
				<div className="resources-body">
					{this.state.loading && <Loading height="100" width="100"/>}

					{this.state.links.map((item, index) =>
						<ResourceItem
							index={index}
							key={item.id}
							id={item.id}
							score={item.score}
							title={item.title}
							url={item.url}
							createdBy={item.createdBy}
							upvote={upvote}
							active={this.state.links[index].active}
						/>
					)}

				</div>
			</>
		)
	}
}

const ResourcesContainer = withFirebase(ResourcesContainerBase);

export default ResourcesPage;

export { ResourcesContainer };