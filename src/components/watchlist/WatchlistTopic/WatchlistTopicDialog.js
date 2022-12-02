import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import WatchlistTopicTabs from './WatchlistTopicTabs';
import WatchlistTopicSearch from './WatchlistTopicSearch';
import WatchlistTopicUploadCSV from './WatchlistTopicUploadCSV';
import WatchlistTopicPaste from './WatchlistTopicPaste';
import useStyles from './WatchlistTopicStyles';
import { setWatchlistSelectedSymbols } from '../../../reducers/Watchlist';

const WatchlistTopicDialog = ({ error, onClose, onUpload, open }) => {
  const disptach = useDispatch();
  const { selectedTab, selectedSymbols } = useSelector(state => state.Watchlist);

  const classes = useStyles();

  const handleClose = () => {
    disptach(setWatchlistSelectedSymbols([]));
    onClose();
  };

  const handleUpload = () => {
    onUpload();
  };

  let selectedComponent = null;

  switch (selectedTab) {
    case 0:
      selectedComponent = <WatchlistTopicSearch />;
      break;
    case 1:
      selectedComponent = <WatchlistTopicUploadCSV />;
      break;
    case 2:
      selectedComponent = <WatchlistTopicPaste />;
      break;
    default:
      selectedComponent = null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted={false}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}>
      <DialogTitle>{'Add to Watchlist'}</DialogTitle>
      <DialogContent>
        <WatchlistTopicTabs />
        <div className={classes.topicDialogContent}>{selectedComponent}</div>
      </DialogContent>
      <DialogActions>
        {error ? <Typography color="error">Unable to add symbols</Typography> : null}
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          color="primary"
          disabled={selectedSymbols.length > 0 ? false : true}
          autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

WatchlistTopicDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired
};

export default WatchlistTopicDialog;
