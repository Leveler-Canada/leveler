import React, { Component } from 'react'
import axios from 'axios'
import { withFirebase } from '../Firebase';
import Header from '../Header';
import { Loading } from '../Animations'
import DistributeHeader from './DistributeHeader';
import DistributeCard from './DistributeCard';
import FooterNav from '../FooterNav';
import ShareModal from '../Modal/ShareModal';

const numEntries = 5;
const group = process.env.REACT_APP_LEVELER_GROUP;

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
	ipLocale: null,
	distributed: true,
	showModal: false,
	modalHasBeenShown: false
};

const DEFAULT_LOCALE = {
	country_code: '',
	region_code: '',
};

const { REACT_APP_IPDATA_KEY } = process.env;

class DistributeTableBase extends Component {

	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
		this.distributeClick = this.distributeClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

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
		let entries = [];
		const { entriesCollection } = this.props.firebase;
		const { country_code, region_code } = locale || DEFAULT_LOCALE;

		const random = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

		if (country_code !== "US") {

			try {
				await entriesCollection
					.where("random", ">=", random)
					.where("group", "==", group)
					.orderBy("random")
					.limit(numEntries)
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
						if (entries.length > numEntries) {
							entries = this.getRandom(entries, numEntries);
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

	distributeClick = () => {
		if (!this.state.modalHasBeenShown) {
			this.setState({
				showModal: true,
				modalHasBeenShown: true
			})
		}
	}

	closeModal() {
		this.setState({
			showModal: false
		})
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
						onCheckboxClick={this.distributeClick}
					/>
					))}
				<ShareModal closeModal={this.closeModal} modalIsOpen={this.state.showModal}/>
			</div>
		)
	}
}

const DistributeTable = withFirebase(DistributeTableBase);

export default DistributePage;

export { DistributeTable };
