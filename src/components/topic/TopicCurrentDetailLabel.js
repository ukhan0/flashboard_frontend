import React, { Fragment } from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import TopicDropDown from './TopicDrowpDown';
import clsx from 'clsx';
import { format } from 'date-fns';
import { isEmpty } from 'lodash';

import {
  setOpenTopicSearchDialog,
  setSelectedIndustries,
  setSelectedSearch,
  resetAllSearchParams,
  setShowUpdateButton
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
  const { currentSearchDetail } = useSelector(state => state.Topic);
  const isSuggestions = currentSearchDetail.selectedSuggestions;
  let selectedSug;
  if (!isEmpty(isSuggestions)) {
    selectedSug = isSuggestions[Object.keys(isSuggestions)[0]];
  }
  let startDate = currentSearchDetail.startDate;
  let endDate = currentSearchDetail.endDate;
  let documents = currentSearchDetail.documentType ? currentSearchDetail.documentType : [];
  const dispatch = useDispatch();
  const displayDateFormat = 'MMMM yyyy';
  const handleOpenTopicDialog = () => {
    dispatch(setOpenTopicSearchDialog(true));
    dispatch(setSelectedIndustries([]));
    dispatch(setShowUpdateButton(false));
    dispatch(setSelectedSearch(null, null));
    dispatch(resetAllSearchParams());
  };
  return (
    <Fragment>
      <div className={classes.label}>
        <Paper className={clsx('app-page-title')}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <span className="text-black-50 d-block">Searching:</span>
              <span className="font-weight-bold">{currentSearchDetail.seachText}</span>
              <br></br>
              <span className="text-black-50">{selectedSug ? selectedSug.join(', ') : null}</span>
            </Grid>
            <Grid item xs={3}>
              <span className="text-black-50 d-block">From:</span>
              <span className={clsx('font-weight-bold', classes.from)}>
                {currentSearchDetail.selectedUniverse} &nbsp;
              </span>
              <span className="font-weight-bold">
                {documents.join(', ')} {currentSearchDetail.selectedSection}
              </span>
            </Grid>
            <Grid item xs={2}>
              <span className="text-black-50 d-block">During:</span>
              {currentSearchDetail.startDate ? (
                <span className="font-weight-bold">{format(startDate, displayDateFormat)}</span>
              ) : null}
              {currentSearchDetail.startDate ? (
                <span className="font-weight-bold">-{format(endDate, displayDateFormat)}</span>
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
