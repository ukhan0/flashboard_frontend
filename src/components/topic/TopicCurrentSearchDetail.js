import React, { Fragment } from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import TopicDropDown from './TopicDrowpDown';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { renameDocumentTypes } from './topicHelpers';

import {
  setOpenTopicSearchDialog,
  setSelectedIndustries,
  setSelectedSearch,
  resetAllSearchParams,
  setShowUpdateButton,
  setBackDropOnCompanyClick
} from '../../reducers/Topic';
const useStyles = makeStyles(theme => ({
  dialog: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  label: {
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '5px'
  },
  fontSize: {
    fontSize: '0.75rem'
  },
  from: {
    display: 'inline',
    textTransform: 'capitalize'
  }
}));

const TopicDialog = props => {
  const classes = useStyles();
  const { currentSearchDetail, documentTypes, selectedDocumentTypes } = useSelector(state => state.Topic);
  const isSuggestions = currentSearchDetail.selectedSuggestions;
  let selectedSug = [];
  if (!isEmpty(isSuggestions)) {
    selectedSug = Object.values(isSuggestions);
  }
  let startDate = currentSearchDetail.startDate;
  let endDate = currentSearchDetail.endDate;
  let documents = currentSearchDetail.documentType ? currentSearchDetail.documentType : [];
  const dispatch = useDispatch();
  const displayDateFormat = 'MMMM YYYY';
  const handleOpenTopicDialog = () => {
    dispatch(setOpenTopicSearchDialog(true));
    dispatch(setSelectedIndustries([]));
    dispatch(setShowUpdateButton(false));
    dispatch(setSelectedSearch(null, null));
    dispatch(resetAllSearchParams());
    dispatch(setBackDropOnCompanyClick(false));
  };
  return (
    <Fragment>
      <div className={classes.label}>
        <Paper className={clsx('app-page-title')}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <span className="text-black-50 d-block">Searching:</span>
              <span className="font-weight-bold">{currentSearchDetail.searchLabel}</span>
              <br></br>
              <span className="text-black-50">{selectedSug.length > 0 ? selectedSug.flat().join(', ') : null}</span>
            </Grid>
            <Grid item xs={3}>
              <span className="text-black-50 d-block">File Types</span>
              {selectedDocumentTypes.length === documentTypes.length ? (
                <span className="font-weight-bold">All</span>
              ) : (
                <span className="font-weight-bold">
                  {`${renameDocumentTypes(documents)}${documents.length > 5 ? ' ...' : ''}`}
                  {currentSearchDetail.selectedSection}
                </span>
              )}
            </Grid>
            <Grid item xs={2}>
              <span className="text-black-50 d-block">From-To</span>
              {currentSearchDetail.startDate ? (
                <span className="font-weight-bold">{moment(startDate).format(displayDateFormat)}</span>
              ) : null}
              {currentSearchDetail.startDate ? (
                <span className="font-weight-bold">-{moment(endDate).format(displayDateFormat)}</span>
              ) : null}
            </Grid>

            <Grid item xs={4}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid item>
                  <TopicDropDown />
                </Grid>
                <Grid item>
                  <Button onClick={handleOpenTopicDialog} variant="contained" color="primary" className="m-2">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fas', 'upload']} />
                    </span>
                    <span className="btn-wrapper--label">Compose new</span>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div></div>
    </Fragment>
  );
};

export default TopicDialog;
