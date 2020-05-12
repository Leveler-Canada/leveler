import React from 'react';

const DistributeHeader = (props) => (
  <div>
    <p className="distribute-header-main"><b>The leveler is a database of freelancers, service industry and gig economy folks currently without income due to COVID-19.</b></p>
    <p className="distribute-header">
      Below are 5 people
      {' '}
      <b><i>chosen at random</i></b>
      , send the
      {' '}
      <b><i>same amount</i></b>
      {' '}
      to each person
    </p>
  </div>
);

export default DistributeHeader;
