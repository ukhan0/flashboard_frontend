import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const TopicDeleteSearchConfirmDialog = props => {
  return (
    <Dialog
      open={props.open}
      onClick={e => {
        e.stopPropagation();
      }}
      onClose={e => {
        props.handleDeleteSearch(e);
      }}>
      <div className="text-center p-5">
        <div className="avatar-icon-wrapper rounded-circle m-0">
          <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
            <FontAwesomeIcon icon={['fas', 'trash']} className="d-flex align-self-center display-3" />
          </div>
        </div>
        <h4 className="font-weight-bold mt-4">Are you sure you want to delete this search?</h4>
        <p className="mb-0 font-size-lg text-muted">You cannot undo this operation.</p>
        <div className="pt-4">
          <Button
            onClick={e => {
              props.confirmDeleteSearch(e);
            }}
            color="primary"
            variant="contained"
            className="mx-1">
            <span className="btn-wrapper--label">Delete</span>
          </Button>
          <Button
            onClick={e => {
              props.handleDeleteSearch(e);
            }}
            variant="outlined"
            color="secondary"
            className="mx-1">
            <span className="btn-wrapper--label">Cancel</span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default TopicDeleteSearchConfirmDialog;
