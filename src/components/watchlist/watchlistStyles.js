import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  watchlistTableContainer: {
    width: '100%'
  },
  watchlistSearchField: {
    '& .MuiOutlinedInput-inputAdornedStart': {
      padding: '11px 10px'
    }
  }
}));
