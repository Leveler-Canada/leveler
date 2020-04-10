import React from 'react';
import localizationBundle from '../../constants/dictionary';

const DistributeHeader = (props) => (
  <div>
    <p className="distribute-header-main"><b>{localizationBundle.distributePage.main}</b></p>
    <p className="distribute-header">
      {localizationBundle.distributePage.interimSignUpPrompt}
      {/* {localizationBundle.distributePage.textIntro} */}
      <b>
        <i>
          {/* {localizationBundle.distributePage.textImportant} */}
        </i>
      </b>
      {/* {localizationBundle.distributePage.textOutro}
      {' '} */}
    </p>
  </div>
);

export default DistributeHeader;
