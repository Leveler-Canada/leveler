import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
const FooterNav = () => (
	<footer>
		<div>
			<a
				href="https://docs.google.com/document/d/1q4BHgMRKO3W6-gRpGPB6EFXFfvyDLGaCsj7kny7CTG4/edit?usp=sharing"
				target="_blank"
				rel="noopener noreferrer"
			>
				about the leveler
			</a>
		</div>
		<div>
			<a
				href="https://docs.google.com/document/d/1OqjFn7f5YRxzD71v-ieGSruQUdTST5K3woPl-yrDDkc/edit?usp=sharing"
				target="_blank"
				rel="noopener noreferrer"
			>
				updates
			</a>
		</div>
		<div>
			<a
				href="https://docs.google.com/document/d/1zyTKTN55fOQHiB5XKtkIVu42_oCtSq7WbFAsLB4blD8/edit?usp=sharing"
				target="_blank"
				rel="noopener noreferrer"
			>
				contribute
			</a>
		</div>
	</footer>
);
export default FooterNav;
