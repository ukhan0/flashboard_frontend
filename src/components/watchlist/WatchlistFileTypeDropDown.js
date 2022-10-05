import React, { useState, useEffect, useTransition, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, TextField, Popper } from '@material-ui/core';
import useStyles from './watchlistStyles';
import { debounce, get } from 'lodash';
import { setWatchlistFileType } from '../../reducers/Watchlist';
import {} from '../../reducers/Sentiment';
import {} from '../Filings/FillingsHelper';
import {} from '../watchlist/WatchlistHelpers';

// import CloseIcon from '@material-ui/icons/Close';
import { FileTypes } from '../../config/watchlistFileTyes';

const createOptionLabel = option => {
  return option.labelToShow;
};

const WatchlistFileTypeDropDown = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const [data, setData] = useState([]);
  const { selectedType, cancelExistingDocumentTypeCalls, selectedFileType } = useSelector(state => state.Watchlist);

  const CustomPopper = props => {
    return <Popper {...props} className={classes.root} placement="bottom" />;
  };

  const getFileTypes = useCallback(() => {
    if (selectedType === 'global') {
      return FileTypes.canadaFileTypes;
    } else if (selectedType === 'domestic') {
      return FileTypes.usFileTypes;
    } else if (selectedType === 'newGlobal') {
      return FileTypes.globalFileTypes;
    } else {
      return [];
    }
  }, [selectedType]);
  const handleSearchTextChange = debounce(async text => {
    // free text search for Watchlist table
    if (!text || text.length < 1) {
      setAvailableSymbols(getFileTypes());
      setData(getFileTypes());
      return;
    }
    const searchabletext = text.toLowerCase();
    const filteredWatchlist = data.filter(c =>
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
        PopperComponent={CustomPopper}
        renderInput={params => (
          <TextField
            onBlur={() => {}}
            {...params}
            variant="outlined"
            placeholder="Type Document Name or  Symbol"
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
      />
    </FormControl>
  );
};

export default WatchlistFileTypeDropDown;
