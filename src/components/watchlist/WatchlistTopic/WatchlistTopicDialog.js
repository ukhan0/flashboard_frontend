import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import WatchlistTopicTabs from './WatchlistTopicTabs';
import WatchlistTopicSearch from './WatchlistTopicSearch';
import WatchlistTopicUploadCSV from './WatchlistTopicUploadCSV';
import WatchlistTopicPaste from './WatchlistTopicPaste';
import useStyles from './WatchlistTopicStyles';

const WatchlistTopicDialog = props => {
  // const [errMsg, setErrMsg] = useState('');
  const { selectedTab, selectedSymbols, error } = props;
  const classes = useStyles();

  const handleClose = () => {
    props.onClose();
  };

  const handleUpload = () => {
    props.onUpload();
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
    <Dialog open={props.open} onClose={handleClose} keepMounted={false}>
      <DialogTitle>{'Add Symbol'}</DialogTitle>
      <DialogContent>
        <WatchlistTopicTabs />
        <div className={classes.topicDialogContent}>{selectedComponent}</div>
      </DialogContent>
      <DialogActions>
        {error ? (
          <Typography color="error">Unable to add symbols</Typography>
        ) : null}
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

const mapStateToProps = state => ({
  selectedTab: state.Watchlist.selectedTab,
  selectedSymbols: state.Watchlist.selectedSymbols
});

export default connect(mapStateToProps)(WatchlistTopicDialog);
