import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  backdropContent: {
    display: 'flex',
    flexDirection: 'column',
    'alignItems': 'center',
  },
  cancleBtn: {
  }
}));
