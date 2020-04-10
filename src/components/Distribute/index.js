import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import Header from '../Header';
import DistributeHeader from './DistributeHeader';
import FooterNav from '../FooterNav';
import localizationBundle from '../../constants/dictionary';


const DistributePage = () => (
  <div className="wrapper">
    <Header />
    <DistributeTable />
    <FooterNav />
  </div>
);

class DistributeTableBase extends Component {
  async componentDidMount() {
    document.title = 'leveler: distribute';
  }

  render() {
    return (
      <>
        <DistributeHeader />
        <div className="main-btn-container">
          <Link to="/signup" onClick={this.onReceiveClick}>
            <button className="btn">{localizationBundle.recive}</button>
          </Link>
        </div>
      </>
    );
  }
}

const DistributeTable = withFirebase(DistributeTableBase);

export default DistributePage;

export { DistributeTable };
