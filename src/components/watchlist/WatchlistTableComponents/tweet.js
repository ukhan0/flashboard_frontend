import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
export default function WordStatus(props) {
  const isSocial = data => {
    let status = false;
    let isFlagSocial = get(data, 'data.flag', null);
    if (parseInt(isFlagSocial) !== 0) {
      status = true;
    }
    return status;
  };
  return <div>{isSocial(props) ? <FontAwesomeIcon icon={['fab', 'twitter']} className="font-size-md" /> : null}</div>;
}
