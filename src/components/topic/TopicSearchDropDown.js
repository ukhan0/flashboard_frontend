import React, { useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import useStyles from '../watchlist/watchlistStyles';
import CloseIcon from '@material-ui/icons/Close';
const TopicSearchDropDown = ({
  onClose,
  loading,
  selectionChanged,
  availableSymbols,
  selectedValue,
  closeIcon,
  createOptionLabel,
  placeholder,
  handleSearchTextChange
}) => {

  useEffect(() => {
    const clearBtn = document.getElementById("country_autocomplete_close_btn").parentElement.parentElement;
    const handleClick = () => {
      onClose();
    }
    if (clearBtn) {
      clearBtn.addEventListener("click", handleClick);
    };
    return () => {
      clearBtn.removeEventListener('click', handleClick);
    };
  }, [onClose])

  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        loading={loading}
        style={{ backgroundColor: 'white', borderRadius: '12px', width: '100%' }}
        loadingText={'Loading...'}
        className={classes.searchField}
        onChange={selectionChanged}
        options={availableSymbols}
        value={selectedValue}
        closeIcon={
          closeIcon ? (
            <CloseIcon
              id='country_autocomplete_close_btn'   //do not change or delete ID, an event is being listned through this ID
              fontSize="small"
            />
          ) : null
        }
        getOptionLabel={option => createOptionLabel(option)}
        renderInput={params => (
          <TextField
            onBlur={() => {
              if (true) {
              }
            }}
            {...params}
            variant="outlined"
            placeholder={placeholder}
            onChange={e => handleSearchTextChange(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              ...params.InputProps,
              autoComplete: 'new-password'
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default TopicSearchDropDown;
