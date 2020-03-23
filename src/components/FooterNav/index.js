import React from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
const FooterNav = (props) => {

	const onContributeClick = () => {
		const { logEvent } = props.firebase;
		logEvent("contribute_clicked");
	}

	const onSignUpClick = () => {
		const { logEvent } = props.firebase;
		logEvent("signup_clicked");
	}

  return (
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
        <div>
          <a
		  	onClick={onSignUpClick}
            href="https://docs.google.com/forms/d/1pYA60eG7qG4ekLWf7kEUwJuwJnS6sc8KAH_RPdawvJU/edit#responses"
            target="_blank"
            rel="noopener noreferrer"
          >
            join the database
          </a>
        </div>
        {/* <Link to={ROUTES.SIGNUP}>join the database</Link> */}
      </div>
      <div>
        <a
          onClick={onContributeClick}
          href="https://docs.google.com/document/d/1zyTKTN55fOQHiB5XKtkIVu42_oCtSq7WbFAsLB4blD8/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          contribute
        </a>
      </div>
    </footer>
  );
};
export default withFirebase(FooterNav);
