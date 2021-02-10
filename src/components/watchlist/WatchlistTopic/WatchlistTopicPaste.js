import React from 'react';
import { connect } from 'react-redux';
import { TextField, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import useStyles from './WatchlistTopicStyles';
import { setWatchlistSelectedSymbols, setOverwriteCheckBox } from '../../../reducers/Watchlist';

const WatchlistTopicPaste = props => {
  // const [ uploadedFiles, setUploadedFiles] = useState([])
  const { setWatchlistSelectedSymbols, overwriteCheckBox, setOverwriteCheckBox } = props;
  const classes = useStyles();

  const symbolsChanged = e => {
    const textValue = e.target.value;
    if (textValue) {
      const symbolsArr = textValue.split('\n').filter(v => v);
      setWatchlistSelectedSymbols(symbolsArr);
    }
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <TextField
          className="m-3"
          id="outlined-multiline-static"
          label="Enter one symbol per line"
          multiline
          rows="4"
          defaultValue=""
          variant="outlined"
          onChange={symbolsChanged}
        />
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            value={overwriteCheckBox}
            onChange={() => {
              setOverwriteCheckBox(!overwriteCheckBox);
            }}
          />
        }
        label="Overwrite old values"
      />
    </>
  );
};

const mapStateToProps = state => ({
  checkBox: state.Watchlist.checkBox
});

const mapDispatchToProps = dispatch => ({
  setWatchlistSelectedSymbols: value => dispatch(setWatchlistSelectedSymbols(value)),
  setOverwriteCheckBox: value => dispatch(setOverwriteCheckBox(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistTopicPaste);
