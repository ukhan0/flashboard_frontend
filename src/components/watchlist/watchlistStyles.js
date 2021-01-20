import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  watchlistTableContainer: {
    marginTop: theme.spacing(1),
    height: '100%',
    width: '100%'
  },
  watchlistSearchField: {
    '& .MuiOutlinedInput-inputAdornedStart': {
      padding: '11px 10px'
    }
  }
}));
