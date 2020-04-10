import React from 'react';
import localizationBundle from '../../constants/dictionary';

const DistributeHeader = (props) => (
  <div>
    <p className="distribute-header-main"><b>{localizationBundle.distributePage.main}</b></p>
    <p className="distribute-header">
      {localizationBundle.distributePage.text}
      {' '}
    </p>
  </div>
);

export default DistributeHeader;
