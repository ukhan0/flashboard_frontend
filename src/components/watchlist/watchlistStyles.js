import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  watchlistTableContainer: {
    width: '100%'
  },
  watchlistSearchField: {
    '& .MuiOutlinedInput-inputAdornedStart': {
      padding: '11px 10px',
      width: 100
    }
  },
  spaceBetween: {
    marginLeft: 3
  },
  space: {
    marginBottom: 20
  },
  button: {
    marginRight: 2,
    marginLeft: 3
  }
}));
