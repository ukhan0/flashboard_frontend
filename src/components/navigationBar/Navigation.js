import React from 'react';
import HelpNavigation from './HelpNavigation';
function Navigation(props) {
  return (
    <div>
      <HelpNavigation onClose={props.onClose} />
    </div>
  );
}

export default Navigation;
