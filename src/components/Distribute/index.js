import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import Header from '../Header';
import { Loading } from '../Animations'
import DistributeCard from './DistributeCard';
import FooterNav from '../FooterNav';
import ReactGA from 'react-ga';

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
		ReactGA.initialize('UA-160733498-01');
		ReactGA.pageview(window.location.pathname + window.location.search);
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
						entries.push(doc.data().entry);
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

	render() {
		const { entries } = this.state;
		return (
			<div>
				<p id="distribute-header">Below are 10 people <b><i>chosen at random</i></b>, send the <b><i>same amount</i></b> to each person</p>
				{this.state.loading && <Loading height="100" width="100"/>}
				{entries.map(entry => (
					<DistributeCard
						entry={entry}
						key={entry.random}
					/>
					))}
			</div>
		)
	}
}


const DistributeTable = withFirebase(DistributeTableBase);

export default DistributePage;

export { DistributeTable };