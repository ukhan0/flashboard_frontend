import React, { useState, useEffect, useTransition, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, TextField, Switch, Grid, Tooltip } from '@material-ui/core';
import useStyles from './watchlistStyles';
import { debounce, get } from 'lodash';
import { setWatchlistFileType, setIsNewWatchlistDataAvailable } from '../../reducers/Watchlist';
import {} from '../../reducers/Sentiment';
import {} from '../Filings/FillingsHelper';
import {} from '../watchlist/WatchlistHelpers';
import axios from 'axios';
import config from '../../config/config';
import { setWatchlistFileTypesEmailAlertStatus } from './../../reducers/Watchlist';
import { cloneDeep } from 'lodash';

// import CloseIcon from '@material-ui/icons/Close';
import FileTypes from '../../config/watchlistFileTyes';

const createOptionLabel = option => {
  return `${option.label}`;
};

const WatchlistFileTypeDropDown = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const [data, setData] = useState([]);
  const { selectedType, cancelExistingDocumentTypeCalls, selectedFileType, fileTypesEmailAlertStatus } = useSelector(
    state => state.Watchlist
  );

  const getFileTypes = useCallback(() => {
    let data =
      selectedType === 'global'
        ? FileTypes.filter(v => parseInt(v.globalFlag) === 1)
        : FileTypes.filter(v => parseInt(v.globalFlag) === 0);
    return data;
  }, [selectedType]);
  const handleSearchTextChange = debounce(async text => {
    // free text search for Watchlist table
    if (!text || text.length < 1) {
      setAvailableSymbols(getFileTypes());
      setData(getFileTypes());
      return;
    }
    const searchabletext = text.toLowerCase();
    const filteredWatchlist = data.filter(
      c =>
        get(c, 'label', '')
          .toLowerCase()
          .includes(searchabletext)
    );
    startTransition(() => {
      setAvailableSymbols(filteredWatchlist);
    });
  }, 500);
  useEffect(() => {
    setAvailableSymbols(getFileTypes());
    setData(getFileTypes());
  }, [selectedType, getFileTypes]);
  const selectionChanged = (e, newSelectedSymbol) => {
    if (newSelectedSymbol) {
      dispatch(setWatchlistFileType(newSelectedSymbol.documentTypeGroup));
      dispatch(setIsNewWatchlistDataAvailable(true));
      if (cancelExistingDocumentTypeCalls) {
        cancelExistingDocumentTypeCalls.cancel();
      }
    }
  };
  const getSelectedFileTypeLabel = selectedFileType => {
    let type = getFileTypes().find(
      v => v.documentTypeGroup.toLocaleLowerCase() === selectedFileType.toLocaleLowerCase()
    );
    if (!type) {
      type = null;
    }
    return type;
  };

  const onEmailStatusChange = async (e, send_email, doc_type) => {
    try {
      e.stopPropagation();
      let fileTypesInfoObj = cloneDeep(fileTypesEmailAlertStatus);
      const fileIndex = fileTypesInfoObj.findIndex(fileTypeInfoObj => fileTypeInfoObj.filetype === doc_type);
      if (fileIndex !== -1) {
        fileTypesInfoObj[fileIndex].isEmailEnable = send_email;
      } else {
        fileTypesInfoObj.push({
          filetype: doc_type,
          isEmailEnable: send_email
        });
      }
      dispatch(setWatchlistFileTypesEmailAlertStatus(fileTypesInfoObj));

      const response = await axios.post(`${config.apiUrl}/api/update_doc_email_status`, {
        doc_type,
        send_email
      });
      const isError = get(response, 'data.error', true);
      if (isError) {
        let previousFileTypesInfoObj = cloneDeep(fileTypesEmailAlertStatus);
        const addedObjectIndex = previousFileTypesInfoObj.findIndex(
          fileTypeInfoObj => fileTypeInfoObj.filetype === doc_type
        );
        previousFileTypesInfoObj[addedObjectIndex].isEmailEnable = !send_email;
        dispatch(setWatchlistFileTypesEmailAlertStatus(previousFileTypesInfoObj));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEmailStatus = fileType => {
    const filteredFileType = fileTypesEmailAlertStatus.find(type => type.filetype === fileType);
    return filteredFileType?.isEmailEnable ? true : false;
  };

  return (
    <FormControl style={{ width: '200px' }}>
      <Autocomplete
        loading={isPending}
        style={{ backgroundColor: 'white', borderRadius: '12px' }}
        loadingText={'Loading...'}
        className={classes.searchField}
        onChange={selectionChanged}
        options={availableSymbols}
        value={getSelectedFileTypeLabel(selectedFileType)}
        // closeIcon={<CloseIcon onClick={() => {}} fontSize="small" />}
        closeIcon={false}
        getOptionLabel={option => createOptionLabel(option)}
        renderInput={params => (
          <TextField
            onBlur={() => {}}
            {...params}
            variant="outlined"
            placeholder="Type Company Name or Symbol"
            onChange={e => {
              handleSearchTextChange(e.target.value);
            }}
            fullWidth
            size="small"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password'
            }}
          />
        )}
        renderOption={option => {
          const isEnable = getEmailStatus(option.documentTypeGroup);
          return (
            <Grid container justify="space-between" alignItems="center" style={{ height: '20px' }}>
              <div>{option.documentTypeGroup}</div>
              <Tooltip title={'Email Alert!'} placement="top" arrow>
                <Switch
                  size="small"
                  checked={isEnable}
                  onClick={e => onEmailStatusChange(e, !isEnable, option.documentTypeGroup)}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Tooltip>
            </Grid>
          );
        }}
      />
    </FormControl>
  );
};

export default WatchlistFileTypeDropDown;
