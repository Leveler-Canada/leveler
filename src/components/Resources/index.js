import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import { withFirebase } from '../Firebase';
import Header from '../Header';
import { Loading } from '../Animations'
import { Leveler } from '../Icons'
import Auth from '../Modal/Auth'
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
	loading: true,
	modalIsOpen: false
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
		const { modalIsOpen } = this.state;

		const linkClicked = async (url) => {
			await logEvent("resource_link_clicked", {url: url});
		}
		
		const upvote = async (index, score) => {
			const { fieldValue, resourcesCollection } = this.props.firebase;

			const { links } = this.state;
			links[index].score = score;
			links[index].active = true;

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

		// MODAL STATE MANAGEMENT
		const toggleModal = (modalIsOpen) => {
			this.setState({
				modalIsOpen: !modalIsOpen
			})
		}

		return (
			
			<>
				<Auth
					toggleModal={toggleModal}
					modalIsOpen={modalIsOpen}
					firebase={firebase}
				/>
				<nav className="resources-header"> 
					<ul>
						<Link to="/" id="leveler-icon"><Leveler /></Link>
						<li onClick={() => {this.getTopLinks()}}>top</li>
						<li onClick={() => {this.getNewLinks()}}>new</li>
						<li onClick={() => {this.getNewLinks()}}>submit</li>
						<li onClick={() => {toggleModal(this.state.modalIsOpen)}}>login</li>
					</ul>
				</nav>
				<div className="resources-body">
					{this.state.loading && <Loading height="70" width="70"/>}

					{!this.state.loading ? (
						this.state.links.map((item, index) =>
							<ResourceItem
								index={index}
								key={item.id}
								id={item.id}
								score={item.score}
								title={item.title}
								url={item.url}
								by={item.by}
								category={item.category}
								created={item.created}
								upvote={upvote}
								active={this.state.links[index].active}
								getByCategory={getByCategory}
								linkClicked={linkClicked}
							/>
						)
					): null}
				</div>
			</>
		)
	}
}

const ResourcesContainer = withFirebase(ResourcesContainerBase);

export default ResourcesPage;

export { ResourcesContainer };