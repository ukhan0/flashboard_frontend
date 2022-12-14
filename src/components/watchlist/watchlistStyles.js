import makeStyles from '@material-ui/core/styles/makeStyles';

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
    marginLeft: 3,
    width: 'max-content'
  },
  screenBtnGroupContainer: {
   alignSelf: 'flex-start',
   marginTop: 23
  },
  screenBtnGroup: {
    justifyContent: 'flex-end'
  },
  allBtnActiveContainer: {
    paddingTop: '0px'
  },
  loaderContainer: {
    position: 'absolute',
    width: '100%'
  },
  loaderSection: {
    display: 'flex',
    justifyContent: 'center'
  },
  formControl: {
    width: '100%'
  },
  agButtons: {
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    cursor: 'pointer',
    backgroundColor: 'lightgray',
    padding: '8px 0px'
  },
  root: {
    zIndex: '0 !important'
  }
}));
