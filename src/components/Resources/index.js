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
	items: [],
	loading: true
};

class ResourcesContainerBase extends Component {
	state = { ...INITIAL_STATE };

	async componentDidMount() {
		// await this.getEntries()
		await this.setState({
			items: [
				{id: 1, title: 'NYC Bars Shut Down', url: 'www.nyc.gov', type: 'story', score: 24, createdBy: 'sam', active: false},
				{id: 2, title: '$2T Stimulus Bill Passed', url: 'www.nyc.gov', type: 'story', score: 18, createdBy: 'adam', active: false},
				{id: 3, title: 'Stonks down', url: 'www.nyc.gov', type: 'story', score: 25, createdBy: 'sabina', active: false},
				{id: 4, title: 'Cases going down', url: 'www.nyc.gov', type: 'story', score: 77, createdBy: 'alessandra', active: false},
				{id: 5, title: 'Cuomo is whatever, really who cares?', url: 'www.nyc.gov', type: 'story', score: 4, createdBy: 'michael', active: false},
			],
			loading: false
		})
	}

	async getLinks() {
		// let entries = [];
		// const { entriesCollection } = this.props.firebase;
		// const random = entriesCollection.doc().id;
		// try {
		// 	await entriesCollection
		// 		.where("random", ">=", random)
		// 		.orderBy("random")
		// 		.limit(10)
		// 		.get()
		// 		.then((querySnapshot) => {
		// 			querySnapshot.forEach((doc) => {
		// 				entries.push(doc.data());
		// 				this.updateShownCount(doc.data().random)
		// 			})
		// 			if (entries) {
		// 				this.setState({
		// 					entries,
		// 					loading: false
		// 				})
		// 			}
		// 		})
		// } catch(e) {
		// 	console.log(e.message)
		// }
	}

	render() {

		const { items } = this.state;

		const upvote = async (index, score) => {
			const { items } = this.state;
			items[index].score = score;
			items[index].active = true;
			await this.forceUpdate()
		}

		const renderItems = items.map((item, index) =>
			<ResourceItem
				index={index}
				key={item.id}
				id={item.id}
				score={item.score}
				title={item.title}
				url={item.url}
				createdBy={item.createdBy}
				upvote={upvote}
				active={this.state.items[index].active}
			/>
		);

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
					{renderItems}
				</div>
			</>
		)
	}
}

const ResourcesContainer = withFirebase(ResourcesContainerBase);

export default ResourcesPage;

export { ResourcesContainer };