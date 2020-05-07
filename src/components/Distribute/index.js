import React, { Component } from 'react'
import axios from 'axios'
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
	loading: true,
	ipLocale: null
};

const { REACT_APP_IPDATA_KEY } = process.env;

class DistributeTableBase extends Component {
	state = { ...INITIAL_STATE };

	async componentDidMount() {
		document.title = "leveler: distribute"
		const ipLocale = await this.getUserLocation();
		this.getEntries(ipLocale)
	}

	getUserLocation = async () => {
		try {
			const res = await axios.get(`https://api.ipdata.co?api-key=${REACT_APP_IPDATA_KEY}`);
			if (res.data) {
				const { country_code, country_name, region_code } = res.data;
				console.log(res.data)
				const ipLocale = {
					country_code, 
					country_name, 
					region_code
				}
				return ipLocale;
			}
		} catch(e) {
			console.log(e.message)
		}
	}
  

	async getEntries(locale) {
		const defaultLocale = {
			country_code: '',
			region_code: -1,
		};
		let entries = [];
		const { entriesCollection } = this.props.firebase;

		const { country_code, region_code } = locale || defaultLocale;
		const random = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
		
		if (country_code !== "US") {

			try {
				await entriesCollection
					.where("random", ">=", random)
					.orderBy("random")
					.limit(10)
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((docSnap) => {
							let docData = docSnap.data();
							docData.id = docSnap.id
							entries.push(docData);
							this.updateShownCount(docSnap.id)
						})
						if (entries) {
							this.setState({
								entries,
								loading: false
							})
						}
					})
			} catch(e) {
				console.error(e.message)
			}
		} else {
			try {
				await entriesCollection
					.where("location.state", "==", region_code)
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((docSnap) => {
							let docData = docSnap.data();
							docData.id = docSnap.id
							entries.push(docData);
						})
						if (entries.length > 10) {
							entries = this.getRandom(entries, 10);
							this.setState({
								entries,
								loading: false
							})
							for (let i in entries) {
								this.updateShownCount(entries[i].id)
							}
						} else {
							this.setState({
								entries,
								loading: false
							})
						}
					})
			} catch(e) {
				console.error(e.message)
			}
		}
	}

	getRandom(arr, n) {
		let result = new Array(n),
			len = arr.length,
			taken = new Array(len);
		if (n > len)
			throw new RangeError("getRandom: more elements taken than available");
		while (n--) {
				let x = Math.floor(Math.random() * len);
			result[n] = arr[x in taken ? taken[x] : x];
			taken[x] = --len in taken ? taken[len] : len;
			}
		return result;
		}
	
	getRandom(arr, n) {
		let result = new Array(n),
			len = arr.length,
			taken = new Array(len);
		if (n > len)
			throw new RangeError("getRandom: more elements taken than available");
		while (n--) {
				let x = Math.floor(Math.random() * len);
			result[n] = arr[x in taken ? taken[x] : x];
			taken[x] = --len in taken ? taken[len] : len;
			}
		return result;
		}

	async updateShownCount(docId) {
		const { fieldValue, entriesCollection } = this.props.firebase;
		const docRef = entriesCollection.doc(docId)
		try {
			await docRef.update({
				shown: fieldValue.increment(1),
				random: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
			})
		} catch (e) {
			console.error(e.message)
		}
	}

	render() {
		
		const { entries } = this.state;
		const { fieldValue, entriesCollection, miscCollection, logEvent } = this.props.firebase;
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
						miscCollection={miscCollection}
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
