import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import useStyles from './WatchlistTopicStyles';
import { setWatchlistSelectedSymbols, setOverwriteCheckBox } from '../../../reducers/Watchlist';

const WatchlistTopicPaste = props => {
  // const [ uploadedFiles, setUploadedFiles] = useState([])
  const { overwriteCheckBox } = useSelector(state => state.Watchlist);
  const classes = useStyles();
  const dispatch = useDispatch();
  const symbolsChanged = e => {
    const textValue = e.target.value;
    if (textValue) {
      const symbolsArr = textValue.split('\n').filter(v => v);
      dispatch(setWatchlistSelectedSymbols(symbolsArr));
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
              dispatch(setOverwriteCheckBox(!overwriteCheckBox));
            }}
          />
        }
        label="Overwrite old values"
      />
    </>
  );
};

export default WatchlistTopicPaste;
