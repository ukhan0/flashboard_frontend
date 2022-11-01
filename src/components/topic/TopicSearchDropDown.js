import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import useStyles from '../watchlist/watchlistStyles';
import CloseIcon from '@material-ui/icons/Close';
const TopicSearchDropDown = props => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        loading={props.loading}
        style={{ backgroundColor: 'white', borderRadius: '12px', width: '300px' }}
        loadingText={'Loading...'}
        className={classes.searchField}
        onChange={props.selectionChanged}
        options={props.availableSymbols}
        value={props.selectedValue}
        closeIcon={
          props.closeIcon ? (
            <CloseIcon
              onClick={() => {
                props.onClose();
              }}
              fontSize="small"
            />
          ) : null
        }
        getOptionLabel={option => props.createOptionLabel(option)}
        renderInput={params => (
          <TextField
            onBlur={() => {
              if (true) {
              }
            }}
            {...params}
            variant="outlined"
            placeholder={props.placeholder}
            onChange={e => props.handleSearchTextChange(e.target.value)}
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
