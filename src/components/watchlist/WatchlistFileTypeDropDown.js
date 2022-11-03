import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import useStyles from './watchlistStyles';
import { setWatchlistFileType } from '../../reducers/Watchlist';
import { FileTypes } from '../../config/watchlistFileTyes';

const WatchlistFileTypeDropDown = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const [open, setOpen] = useState(false);
  const { selectedType, cancelExistingDocumentTypeCalls, selectedFileType } = useSelector(state => state.Watchlist);

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

  useEffect(() => {
    setAvailableSymbols(getFileTypes());
  }, [getFileTypes]);

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

  const closeDropdown = () => {
    setOpen(false);
  };

  return (
    <FormControl style={{ width: '200px' }}>
      <ClickAwayListener onClickAway={closeDropdown}>
        <Autocomplete
          open={open}
          style={{ backgroundColor: 'white', borderRadius: '12px' }}
          className={classes.searchField}
          onChange={selectionChanged}
          options={availableSymbols}
          value={getSelectedFileTypeLabel(selectedFileType)}
          closeIcon={false}
          getOptionLabel={option => option.labelToShow}
          PopperComponent={props => (
            <Popper {...props} className={classes.root} placement="bottom" onClick={closeDropdown} />
          )}
          renderInput={params => (
            <TextField
              onClick={() => {
                setOpen(prevState => !prevState);
              }}
              {...params}
              variant="outlined"
              placeholder="Type Document Name or  Symbol"
              fullWidth
              size="small"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
                readOnly: true
              }}
            />
          )}
        />
      </ClickAwayListener>
    </FormControl>
  );
};

export default WatchlistFileTypeDropDown;
