import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import Header from '../Header';
import { Loading } from '../Animations'
import DistributeHeader from './DistributeHeader';
import DistributeCard from './DistributeCard';
import FooterNav from '../FooterNav';

const DistributePage = () => (
	<div className="wrapper">
		<Header /> 		
		<DistributeTable />
		<FooterNav />
	</div>
)

const INITIAL_STATE = {
	entries: [],
	loading: true
};

class DistributeTableBase extends Component {
	state = { ...INITIAL_STATE };

	async componentDidMount() {
		document.title = "leveler: distribute"
		await this.getEntries()
	}

	async getEntries() {
		let entries = [];
		const { entriesCollection } = this.props.firebase;
		const random = entriesCollection.doc().id;
		try {
			await entriesCollection
				.where("random", ">=", random)
				.orderBy("random")
				.limit(10)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						entries.push(doc.data());
						this.updateShownCount(doc.data().random)
					})
					if (entries) {
						this.setState({
							entries,
							loading: false
						})
					}
				})
		} catch(e) {
			console.log(e.message)
		}
	}

	async updateShownCount(docId) {
		const { fieldValue, entriesCollection } = this.props.firebase;
		const docRef = entriesCollection.doc(docId)
		try {
			await docRef.update({shown: fieldValue.increment(1)})
		} catch (e) {
			console.log(e.message)
		}
	}

	render() {
		const { entries } = this.state;
		const { fieldValue, entriesCollection, logEvent } = this.props.firebase;
		return (
			<div>
				<DistributeHeader />
				{this.state.loading && <Loading height="100" width="100"/>}
				{entries.map(entry => (
					<DistributeCard
						entry={entry}
						key={entry.id}
						fieldValue={fieldValue}
						entriesCollection={entriesCollection}
						logEvent={logEvent}
					/>
					))}
			</div>
		)
	}
}

const DistributeTable = withFirebase(DistributeTableBase);

export default DistributePage;

export { DistributeTable };