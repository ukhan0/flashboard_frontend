import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  mainContent: {
    height: '85vh'
  },
  stickyFooter: {
    height: '15vh',
    display: 'flex',
    flexDirection: 'column-reverse',
    backgroundColor: 'white'
  }
}));
