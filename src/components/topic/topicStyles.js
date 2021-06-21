import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  herosection: {
    marginLeft: 80
  },
  searchuniverse: {
    marginLeft: 30
  },
  rightBar: {
    padding: theme.spacing(1),
    height: 235,
    border: '1px solid black',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row'
  },
  inflex: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row'
  },
  searchdate: {
    marginTop: 10,
    float: 'right',
    padding: 20
  },
  savebutton: {
    marginTop: 20,
    marginLeft: 80,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  topsection: {
    marginBottom: 15,
    marginTop: 5
  },
  sideFilterSection: {
    height: 600,
    backgroundColor: '#f5f5f5',
    position: 'sticky',
    top: 0
  },
  closeBtnSection: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));
