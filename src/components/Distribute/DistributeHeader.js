import React from 'react';
import localizationBundle from '../../constants/dictionary';

const DistributeHeader = (props) => (
  <div>
    <p className="distribute-header-main"><b>{localizationBundle.distributePage.main}</b></p>
    <p className="distribute-header">
      Below are 10 people
      <b><i>chosen at random</i></b>
      , send the
      <b>
        <i>
          same
          amount
        </i>
      </b>
      {' '}
      to each person
    </p>
  </div>
);

export default DistributeHeader;
