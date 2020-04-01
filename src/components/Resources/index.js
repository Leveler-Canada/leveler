import React, { Component } from 'react'
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
		this.getLinks()
	}

	async getLinks() {
		this.setState({
			loading: true
		})
		let links = [];
		const { resourcesCollection } = this.props.firebase;
		try {
			await resourcesCollection
				.orderBy("score")
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
			const { links } = this.state;
			links[index].score = score;
			links[index].active = true;
			await this.forceUpdate()
		}

		return (
			<>
				<nav className="resources-header">
					<ul>
						<li>leveler</li>
						<li>top</li>
						<li>new</li>
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