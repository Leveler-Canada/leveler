import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import Header from '../Header';
import { Loading } from '../Animations';
import DistributeHeader from './DistributeHeader';
import DistributeCard from './DistributeCard';
import FooterNav from '../FooterNav';

const DistributePage = () => (
  <div className="wrapper">
    <Header />
    <DistributeTable />
    <FooterNav />
  </div>
);

const INITIAL_STATE = {
  entries: [],
  loading: true,
};

class DistributeTableBase extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
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

  async updateShownCount(docId) {
    const { fieldValue, entriesCollection } = this.props.firebase;
    const docRef = entriesCollection.doc(docId);
    try {
      await docRef.update({
        shown: fieldValue.increment(1),
        random: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      });
    } catch (e) {
      console.error(e.message);
    }
  }


  render() {
    const { entries } = this.state;
    const {
      fieldValue, entriesCollection, miscCollection, logEvent,
    } = this.props.firebase;
    return (
      <div>
        <DistributeHeader />
        {this.state.loading && <Loading height="100" width="100" />}
        {entries.map((entry) => (
          <DistributeCard
            entry={entry}
            key={entry.id}
            fieldValue={fieldValue}
            entriesCollection={entriesCollection}
            miscCollection={miscCollection}
            logEvent={logEvent}
          />
        ))}
      </div>
    );
  }
}

const DistributeTable = withFirebase(DistributeTableBase);

export default DistributePage;

export { DistributeTable };
