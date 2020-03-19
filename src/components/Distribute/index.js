import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import Header from '../Header';
import DistributeCard from './DistributeCard';
import FooterNav from '../FooterNav';
import ReactGA from 'react-ga';

const DistributePage = () => (
	<div className="wrapper">
		<Header /> 
		<DistributeTable  />
		<FooterNav />
	</div>
);

class DistributeTableBase extends Component {
	async componentDidMount() {
		ReactGA.initialize('UA-160733498-01');
		ReactGA.pageview(window.location.pathname + window.location.search);
		await this.props.firebase.entriesNode().once('value', snapshot => {
			console.log(snapshot.val().length)
			return snapshot.val();
		})
		
	}
	render() {
		return (
			<div>
				<p id="distribute-header">Send the same amount of money to each of these people</p>
				{entries.map(entry => (
					<DistributeCard
						entry={entry}
					/>
					))}
			</div>
		)
	}
}


const DistributeTable = withFirebase(DistributeTableBase);

export default DistributePage;

export { DistributeTable };

const entries = [
  {
		"location": "Brooklyn, New York",
    "industry": "Nightlife",
    "description": "i'm a lighting designer as of now 2 big events of mine have been cancelled thus far.",
    "payment_link": "https://paypal.me/JosephPerugini?locale.x=en_US",
  },
  {
		"location": "Brooklyn, New York",
    "industry": "Arts",
    "description": "I am a professional freelance dancer, choreographer and model. Due to the Coronavirus, I’ve had rehearsals, auditions, filming, photoshoots, castings, performance gigs and ballet classes I teach postponed or cancelled. As a freelance dancer I literally can’t afford to be out of work. Unfortunately, I am unable to work from home or receive sick pay. I am an artist without work, without pay and with nonstop bills.",
    "payment_link": "https://www.paypal.me/kibrea",
  },
  {
		"location": "Chatanooga, Tennessee",
    "industry": "Production",
    "description": "every recording session i had booked this month has been cancelled and every venue i run live sound in has cancelled all performances until this blows over. any help would be a blessing. ",
    "payment_link": "https://venmo.com/code?user_id=1892369293115392127",
  },
  {
		"location": "Farmingdale, New Jersey",		
    "industry": "Music",
    "description": "Tour is being cancelled. ",
    "payment_link": "https://cash.app/$skepticallincoln",
  },
  {
		"location": "Stockton, California",
    "industry": "Arts",
    "description": "The majority of my gigs including my PT teaching artist gig have been cancelled either permanently or until further notice Which has left me scrambling to find alternatives to make rent and get basic needs met. Many of my clients have shut down venues locally and Being that I live in a smaller city has put myself in a bind and dont have the funds to continue my services. I was slated to do several events and panels during sxsw and all have bern cancelled. Thank you in advance ",
    "payment_link": "http://paypal.me/nataliecrue",
	},
]