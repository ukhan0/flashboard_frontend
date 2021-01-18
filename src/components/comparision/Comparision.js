import React from 'react';
import { connect } from 'react-redux';
import config from '../../config/config';

const Comparision = props => {
  const { selectedItem } = props;

  return (
    <iframe
      src={`${config.comparisionSite}?f1=${selectedItem.recentId}&f2=${selectedItem.oldId}`}
      title="Comparision"
      width="100%"
      height="900"
      samesite="None"
      frameBorder="0"
      id="comparisionResult"
    />
  );
};

const mapStateToProps = state => ({
  selectedItem: state.Watchlist.selectedItem
});

export default connect(mapStateToProps)(Comparision);
