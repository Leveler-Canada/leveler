import React from "react";
import { withFirebase } from "../Firebase";
import { Link } from 'react-router-dom';

const FooterNav = (props) => {

	const onContributeClick = () => {
		const { logEvent } = props.firebase;
		logEvent("contribute_clicked");
  }
  
  const onAboutClick = () => {
    const { logEvent } = props.firebase;
		logEvent("about_clicked");
  }

  return (
    <footer>

        <Link to="/about" onClick={onAboutClick}>
        about leveler
        </Link>

        <a
          href="https://docs.google.com/document/d/1OqjFn7f5YRxzD71v-ieGSruQUdTST5K3woPl-yrDDkc/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          updates
        </a>

        <Link 
          to="/contribute"
          onClick={onContributeClick}
        >
          contribute
        </Link>

    </footer>
  );
};
export default withFirebase(FooterNav);