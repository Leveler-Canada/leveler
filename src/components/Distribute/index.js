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
    document.title = 'leveler: distribuye';
    this.getEntries();
  }

  async getEntries() {
    let entries = [];
    const { entriesCollection } = this.props.firebase;

    try {
      await entriesCollection
        .where('location.country', '==', 'Mexico')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((docSnap) => {
            const docData = docSnap.data();
            docData.id = docSnap.id;
            entries.push(docData);
          });
          if (entries.length > 10) {
            entries = this.getRandom(entries, 10);
            this.setState({
              entries,
              loading: false,
            });
            for (const i in entries) {
              this.updateShownCount(entries[i].id);
            }
          } else {
            this.setState({
              entries,
              loading: false,
            });
          }
        });
    } catch (e) {
      console.error(e.message);
    }
  }

  getRandom(arr, n) {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len) { throw new RangeError('getRandom: more elements taken than available'); }
    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
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
