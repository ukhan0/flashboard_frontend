import React, { useState } from 'react';
import TopicFilters from './TopicFilters';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Slide from '@material-ui/core/Slide';
import { useSelector, useDispatch } from 'react-redux';
import TopicSuggestionsDialog from './TopicSuggestionsDialog';
import { setOpenTopicSearchDialog, resetSuggestions } from '../../reducers/Topic';
import clsx from 'clsx';
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
    marginTop: '20px'
  },
  fontSize: {
    fontSize: '0.75rem'
  }
}));

const TopicDialog = props => {
  const classes = useStyles();
  const [isSuggestionsDlgOpen, setIsSuggestionsDlgOpen] = useState(false);
  const { openTopicSearchDialog, isSimpleSearch } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const handleCloseTopicDialog = () => {
    dispatch(setOpenTopicSearchDialog(false));
  };
  const handleCloseTopicSuggestionsDialog = () => {
    setIsSuggestionsDlgOpen(false);
    if (isSimpleSearch) {
      dispatch(resetSuggestions());
    }
  };
  return (
    <div className={classes.label}>
      {/* {openTopicSearchDialog ? ( */}

      <Slide direction="down" in={openTopicSearchDialog} mountOnEnter unmountOnExit>
        <Paper className={clsx('app-page-title')}>
          <TopicFilters
            onShowSuggestions={() => setIsSuggestionsDlgOpen(true)}
            // onSaveSearch={() => dispatch(setIsSaveDlgOpen(true))}
            onSearch={props.handleSearch}
            handleCloseTopicDialog={handleCloseTopicDialog}
          />
          {isSuggestionsDlgOpen ? (
            <TopicSuggestionsDialog
              isOpen={isSuggestionsDlgOpen}
              onClose={() => null}
              handleClose={() => handleCloseTopicSuggestionsDialog()}
            />
          ) : null}
        </Paper>
      </Slide>
      {/* ) : null} */}
    </div>
  );
};

export default TopicDialog;
