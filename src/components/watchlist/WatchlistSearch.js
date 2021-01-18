import React from 'react';
import { connect } from 'react-redux';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { setWatchlistSearchText } from '../../reducers/Watchlist';
// styles
import useStyles from './watchlistStyles';

const WatchlistSearch = props => {
  const { searchText, setWatchlistSearchText } = props;
  const classes = useStyles();
  return (
    <TextField
      className={classes.watchlistSearchField}
      fullWidth
      value={searchText}
      onChange={e => setWatchlistSearchText(e.target.value)}
      inputProps={{ 'aria-label': 'search' }}
      label="Search…"
      placeholder="Search the table"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className="app-search-icon" />
          </InputAdornment>
        )
      }}
    />
  );
};

const mapStateToProps = state => ({
  searchText: state.Watchlist.searchText
});

const mapDispatchToProps = dispatch => ({
  setWatchlistSearchText: value => dispatch(setWatchlistSearchText(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistSearch);
