import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import Header from '../Header';
import { Loading } from '../Animations'
import FooterNav from '../FooterNav';

const ResourcesPage = () => (
	<div className="wrapper">
		<Header /> 		
		<ResourcesContainer />
		<FooterNav />
	</div>
)

const INITIAL_STATE = {
	items: [
		{id: 1, title: 'NYC Bars Shut Down', url: 'www.nyc.gov', type: 'story', score: 24, createdBy: 'sam'},
		{id: 2, title: '$2T Stimulus Bill Passed', url: 'www.nyc.gov', type: 'story', score: 18, createdBy: 'adam'},
		{id: 3, title: 'Stonks down', url: 'www.nyc.gov', type: 'story', score: 25, createdBy: 'sabina'},
		{id: 4, title: 'Cases going down', url: 'www.nyc.gov', type: 'story', score: 77, createdBy: 'alessandra'},
		{id: 5, title: 'Cuomo is whatever, really who cares?', url: 'www.nyc.gov', type: 'story', score: 4, createdBy: 'michael'},
	],
	loading: true
};

class ResourcesContainerBase extends Component {
	state = { ...INITIAL_STATE };

	async componentDidMount() {
		// await this.getEntries()
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
		const { items } = INITIAL_STATE;
		return (
			<div>
				<nav className="resources-header">
					<ul>
						<li>leveler</li>
						<li>top</li>
						<li>new</li>
						<li>submit</li>
					</ul>
				</nav>
				<div className="resources-body">
				{items.map(item => (
					<div id={item.id} className="resources-item-container">
						<div className="resources-item-votes">
							<a>⬆️</a><p>{item.score}</p>
						</div>
						<div className="resources-item-title">
							<a href={item.url}>{item.title}</a>
						</div>
						<div className="resources-item-detail">
							<p>posted by {item.createdBy}, 2 days ago</p>
						</div>
					</div>
				))}

				</div>
				{/* {this.state.loading && <Loading height="100" width="100"/>} */}
				{/* {entries.map(entry => (
					<DistributeCard
						entry={entry}
						key={entry.id}
						fieldValue={fieldValue}
						entriesCollection={entriesCollection}
						logEvent={logEvent}
					/>
					))} */}
			</div>
		)
	}
}

const ResourcesContainer = withFirebase(ResourcesContainerBase);

export default ResourcesPage;

export { ResourcesContainer };