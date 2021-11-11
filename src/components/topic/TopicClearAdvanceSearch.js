import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dialog, Button } from '@material-ui/core';

const TopicClearAdvanceSearch = props => {
  const handleDialog = v => {
    props.handleToggle();
    props.handleAdvancedSearchText(v);
  };

  return (
    <Fragment>
      <Dialog open={props.open} onClose={props.handleToggle}>
        <div className="text-center p-5">
          <div className="avatar-icon-wrapper rounded-circle m-0">
            <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-first text-first m-0 d-130">
              <FontAwesomeIcon icon={['fas', 'times']} className="d-flex align-self-center display-3" />
            </div>
          </div>
          <h4 className="font-weight-bold mt-4">Do you want to continue?</h4>
          <p className="mb-0 text-black-50">Your search term will be empty</p>
          <div className="pt-4">
            <Button
              onClick={() => {
                handleDialog(true);
              }}
              color="primary"
              variant="contained"
              className="mx-1">
              <span className="btn-wrapper--label">YES</span>
            </Button>
            <Button
              onClick={() => {
                handleDialog(false);
              }}
              variant="outlined"
              color="secondary"
              className="text-danger mx-1">
              <span className="btn-wrapper--label">NO</span>
            </Button>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default TopicClearAdvanceSearch;
