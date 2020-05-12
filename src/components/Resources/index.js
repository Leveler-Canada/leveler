import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import Header from '../Header';
import { Loading } from '../Animations';
import { Leveler } from '../Icons';
import AuthModal from '../Modal/AuthModal';
import ResourceItem from './ResourceItem';
import FooterNav from '../FooterNav';
import { withAuthentication } from '../Session';

const ResourcesPage = () => (
	<div className="wrapper">
		<Header /> 		
		<ResourcesContainer />
		<FooterNav />
	</div>
)

const INITIAL_STATE = {
	links: [],
	loading: true,
	isOpen: false,
};

class ResourcesContainerBase extends Component {
	state = { ...INITIAL_STATE };

	componentDidMount() {
		document.title = "leveler: resources"
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
						// SET UP ID
						link.id = doc.id;
						// SET UP PATH
						link.path = doc.ref.path;
						// SET UP TIMEAGO
						const date = doc.data().created.toDate()
						link.created = timeago.format(date)
						// PUSH TO STATE
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

	newLinksClicked = () => {
		const { logEvent } = this.props.firebase;
		logEvent("new_resources_clicked");
	}

	async getNewLinks() {
		this.setState({
			loading: true
		})
		// LOG GA EVENT
		this.newLinksClicked();

		let links = [];
		const { resourcesCollection } = this.props.firebase;
		try {
			await resourcesCollection
				.where("type", "==", "story")
				.orderBy("created", "desc")
				.limit(50)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						let link = doc.data();
						// SET UP ID
						link.id = doc.id;
						// SET UP PATH
						link.path = doc.ref.path;
						// SET UP TIMEAGO
						const date = doc.data().created.toDate()
						link.created = timeago.format(date)
						// PUSH TO STATE
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
		const { logEvent } = this.props.firebase;
		const { firebase } = this.props;
		const { isOpen } = this.state;
		const { authUser, userData } = this.props;
		
		const upvote = async (index, score) => {
			const { fieldValue, resourcesCollection } = this.props.firebase;

			const { links } = this.state;
			links[index].score = score;

			updateUserKarma(links[index].by)
			// UPDATE LINK SCORE
			const docRef = resourcesCollection.doc(links[index].id);
			try {
				await docRef.update({score: fieldValue.increment(1)});
			} catch (e) {
				console.log(e.message)
			}
			// UPDATE LAST UPDATED TIME OF UPVOTE
			updateLastUpvote(fieldValue.serverTimestamp());
			await this.forceUpdate();
		}

		const updateUserKarma = async (uid) => {
			const { fieldValue, userCollection } = this.props.firebase;			
			const user = userCollection.where('id', '==', uid);
			await user.get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				const userRef = userCollection.doc(doc.id)
				userRef.update({karma: fieldValue.increment(1)});
				});
			})
		}

		const updateLastUpvote = async (updated) => {
			const { miscCollection } = this.props.firebase;
			try {
				await miscCollection.doc('lastUpvote').update({
					updated,
				});
			} catch (e) {
				console.log(e.message);
			}
		}

		const getByCategory = async (category) => {
			this.setState({
				loading: true
			})
			// GA EVENT
			logEvent("resource_category_clicked", {category: category});
			let links = [];
			const { resourcesCollection } = this.props.firebase;
			try {
				await resourcesCollection
					.where("type", "==", "story")
					.where("category", "==", category)
					.limit(30)
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							let link = doc.data();
							// SET UP ID
							link.id = doc.id;
							// SET UP PATH
							link.path = doc.ref.path;
							// SET UP TIMEAGO
							const date = doc.data().created.toDate()
							link.created = timeago.format(date)
							// PUSH TO STATE
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

		const logout = () => {
			const { doSignOut } = this.props.firebase;
				doSignOut()
		}

		// MODAL STATE MANAGEMENT
		const toggleModal = (isOpen) => {
			this.setState({
				isOpen: !isOpen
			})
		}

		return (
			<>
				<AuthModal
					toggleModal={toggleModal}
					isOpen={isOpen}
					firebase={firebase}
				/>
				<nav className="resources-header">
					<ul>
						<li onClick={() => {this.getTopLinks()}} id="leveler-icon"><Leveler /></li>
						<li onClick={() => {this.getTopLinks()}}>top</li>
						<li onClick={() => {this.getNewLinks()}}>new</li>
						<Link id="submit-link" to="/add-resource">submit</Link>
						{userData ? 
							<>
							<li>{userData.id} ({userData.karma})</li>
							<span>|</span>
							<button onClick={() => {logout()}}>logout</button>
							</>
							: 
							<li onClick={() => {toggleModal(this.state.isOpen)}}>login</li>}
					</ul>
				</nav>
				<div className="resources-body">
					{this.state.loading && <Loading height="70" width="70"/>}

					{!this.state.loading ? (
						this.state.links.map((item, index) =>
							<ResourceItem
								key={item.id}
								index={index}
								item={item}
								upvote={upvote}
								getByCategory={getByCategory}
								userData={userData}
							/>
						)
					): null}
				</div>
			</>
		)
	}
}

const ResourcesContainer = withAuthentication(ResourcesContainerBase);

export default ResourcesPage;

export { ResourcesContainer };