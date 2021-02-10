import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  selectedBtn: {
    color: 'pink'
  }
}));
