import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
const FooterNav = () => (
	<footer>
		<div>
		<a
			href="https://docs.google.com/document/d/1q4BHgMRKO3W6-gRpGPB6EFXFfvyDLGaCsj7kny7CTG4/edit?usp=sharing"
			target="_blank"
		>
			about the leveler
		</a>
		</div>
		<div>
		<a
			href="https://docs.google.com/document/d/1OqjFn7f5YRxzD71v-ieGSruQUdTST5K3woPl-yrDDkc/edit?usp=sharing"
			target="_blank"
		>
			updates
		</a>
		</div>
		<div>
	    <Link to={ROUTES.SIGNUP}>join the database</Link>
		</div>
		<div>
		<a
			href="https://docs.google.com/document/d/1zyTKTN55fOQHiB5XKtkIVu42_oCtSq7WbFAsLB4blD8/edit?usp=sharing"
			target="_blank"
		>
			contribute
		</a>
		</div>
	</footer>
);
export default FooterNav;
