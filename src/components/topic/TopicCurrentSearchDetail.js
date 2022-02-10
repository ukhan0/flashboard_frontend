import React, { Fragment } from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import TopicDropDown from './TopicDrowpDown';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { renameDocumentTypes, preventParentClick } from './topicHelpers';
import {
  setSelectedIndustries,
  resetAllSearchParams,
  setAllSearchParams,
  setSelectedSearch,
  setSuggestions,
  setShowComposeNew,
  setShowUpdateButton,
  setSearchLabel,
  setOpenTopicSearchDialog,
  setBackDropOnCompanyClick
} from '../../reducers/Topic';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  dialog: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  label: {
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '5px',
    cursor: 'pointer'
  },
  fontSize: {
    fontSize: '0.75rem'
  },
  from: {
    display: 'inline',
    textTransform: 'capitalize'
  },
  editSeachSection: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'baseline'
  }
}));

const TopicDialog = props => {
  const classes = useStyles();
  const history = useHistory();
  const {
    currentSearchDetail,
    documentTypes,
    selectedDocumentTypes,
    openTopicSearchDialog,
    selectedSearch,
    savedSearches,
    isUnsavedSearch,
    searchLabel
  } = useSelector(state => state.Topic);
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
  const handleOpenTopicDialog = e => {
    preventParentClick(e);
    let currURL = window.location.href;
    let afterDomain = currURL.substring(currURL.lastIndexOf('/') + 1);
    let beforeQueryString = afterDomain.split('?')[0];
    history.push(`/${beforeQueryString}`);

    dispatch(setOpenTopicSearchDialog(!openTopicSearchDialog));
    dispatch(setSelectedIndustries([]));
    dispatch(setShowUpdateButton(false));
    dispatch(resetAllSearchParams());
    dispatch(setBackDropOnCompanyClick(false));
  };

  const setSearchParamsEdit = searchObj => {
    dispatch(setSelectedSearch(searchObj));
    dispatch(setSuggestions({}));
    dispatch(setAllSearchParams(searchObj));
    dispatch(setSearchLabel(searchObj.searchLabel));
    dispatch(setOpenTopicSearchDialog(true));
  };

  const handleEdit = e => {
    preventParentClick(e);

    if (!isUnsavedSearch) {
      const searchObj = savedSearches.find(s => selectedSearch.searchId === s.searchId);
      if (!searchObj) {
        return;
      }
      dispatch(setShowUpdateButton(true));
      dispatch(setShowComposeNew(true));
      dispatch(setBackDropOnCompanyClick(false));
      setSearchParamsEdit(searchObj);
    } else {
      dispatch(setSearchLabel(searchLabel));
      dispatch(setOpenTopicSearchDialog(true));
    }
  };

  return (
    <Fragment>
      <div className={classes.label}>
        <Paper
          className={clsx('app-page-title')}
          onClick={e => {
            handleEdit(e);
          }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <span className="text-black-50 d-block">Searching:</span>
              <span className="font-weight-bold">{currentSearchDetail.searchLabel}</span>
              <br></br>
              <span className="text-black-50">{currentSearchDetail.searchTerm}</span>
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
                  <div className={classes.editSeachSection}>
                    {!openTopicSearchDialog ? (
                      <div>
                        <Button color="primary" size="small" aria-haspopup="true" onClick={e => handleEdit(e)}>
                          Edit
                        </Button>
                      </div>
                    ) : null}
                    <TopicDropDown />
                  </div>
                </Grid>
                <Grid item>
                  <Button onClick={e => handleOpenTopicDialog(e)} variant="contained" color="primary" className="m-2">
                    <span className="btn-wrapper--icon">
                      {openTopicSearchDialog ? (
                        <FontAwesomeIcon icon={['fas', 'upload']} />
                      ) : (
                        <FontAwesomeIcon icon={['fas', 'download']} />
                      )}
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
