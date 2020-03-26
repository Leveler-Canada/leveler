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
	categories: ['News', 'Government','Business', 'Medical'],
	links: [
		{id: 1, roomId: 1, title: 'NYC Bars Shut Down', url: 'www.nyc.gov', category: 'News'},
		{id: 2, roomId: 2, title: '$2T Stimulus Bill Passed', url: 'www.nyc.gov', category: 'Government'},
		{id: 3, roomId: 3, title: 'Stonks down', url: 'www.nyc.gov', category: 'Business'},
		{id: 4, roomId: 4, title: 'Cases going down', url: 'www.nyc.gov', category: 'Medical'},
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
		return (
			<section>
				<p>hi</p>
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
			</section>
		)
	}
}

const ResourcesContainer = withFirebase(ResourcesContainerBase);

export default ResourcesPage;

export { ResourcesContainer };