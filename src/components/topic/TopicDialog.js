import React, { Fragment, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CloseIcon from '@material-ui/icons/Close';
import TopicFilters from './TopicFilters';
import { useSelector, useDispatch } from 'react-redux';
import TopicSuggestionsDialog from './TopicSuggestionsDialog';
import { setOpenTopicSearchDialog } from '../../reducers/Topic';
const useStyles = makeStyles(theme => ({
  dialog: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  dialog2: {
    minWidth: '500px'
  },
  label: {
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '5px'
  },
  fontSize: {
    fontSize: '0.75rem'
  }
}));

const TopicDialog = props => {
  const classes = useStyles();
  const [isSuggestionsDlgOpen, setIsSuggestionsDlgOpen] = useState(false);
  const { openTopicSearchDialog } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const handleCloseTopicDialog = () => {
    dispatch(setOpenTopicSearchDialog(false));
  };
  return (
    <Fragment>
      <Dialog scroll="body" open={false} onClose={handleCloseTopicDialog} aria-labelledby="form-dialog-title2">
        <Grid container direction="row" justify="flex-end" alignItems="flex-start">
          <Grid item>
            <IconButton
              onClick={() => {
                handleCloseTopicDialog();
              }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
        <div className={classes.dialog}>
          <TopicFilters
            onShowSuggestions={() => setIsSuggestionsDlgOpen(true)}
            onSearch={props.handleSearch}
          />
          {isSuggestionsDlgOpen ? (
            <TopicSuggestionsDialog
              isOpen={isSuggestionsDlgOpen}
              onClose={() => null}
              handleClose={() => setIsSuggestionsDlgOpen(false)}
            />
          ) : null}
        </div>
      </Dialog>
    </Fragment>
  );
};

export default TopicDialog;
