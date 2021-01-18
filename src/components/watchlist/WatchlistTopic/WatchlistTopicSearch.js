import React from 'react';
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, Chip, TextField } from '@material-ui/core';
import useStyles from './WatchlistTopicStyles';

const WatchlistTopicSearch = props => {
  const classes = useStyles();
  const { selectedSymbols, availableSymbols } = props;
  console.log(selectedSymbols);
  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        multiple
        id="watchlist-topic-search"
        options={availableSymbols}
        getOptionLabel={option => option}
        defaultValue={selectedSymbols}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            label="Symbol"
            variant="outlined"
            placeholder="Type Symbol here"
            fullWidth
          />
        )}
      />
    </FormControl>
  );
};

const mapStateToProps = state => ({
  selectedSymbols: state.Watchlist.selectedSymbols,
  availableSymbols: state.Watchlist.availableSymbols
});

export default connect(mapStateToProps)(WatchlistTopicSearch);
