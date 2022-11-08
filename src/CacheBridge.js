import React, { memo } from 'react';
import Cache from './Cache';
import { useSelector } from 'react-redux';

const CacheBridge = () => {
  const { user, isNewEmailNotification } = useSelector(state => state.User);
  return user ? (
    <Cache
      isNewEmailNotification={isNewEmailNotification}
      authentication_token={user.authentication_token}
      id={user.id}
    />
  ) : null;
};

export default memo(CacheBridge);
