import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isItSocialCompany } from '../WatchlistHelpers';

export default function WordStatus(props) {
  return (
    <div>
      {isItSocialCompany(props?.data?.flag) ? (
        <FontAwesomeIcon icon={['fab', 'twitter']} className="font-size-md" />
      ) : null}
    </div>
  );
}
