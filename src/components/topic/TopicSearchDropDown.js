import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, TextField } from '@material-ui/core';
import useStyles from '../watchlist/watchlistStyles';
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
        closeIcon={false}
        getOptionLabel={option => props.createOptionLabel(option)}
        renderInput={params => (
          <TextField
            onBlur={() => {
              if (true) {
              }
            }}
            {...params}
            variant="outlined"
            placeholder="Type Index Name"
            onChange={e => props.handleSearchTextChange(e.target.value)}
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

export default TopicSearchDropDown;
