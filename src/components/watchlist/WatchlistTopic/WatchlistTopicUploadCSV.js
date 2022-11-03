import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dropzone from 'react-dropzone';
import useStyles from './WatchlistTopicStyles';
import { setWatchlistSelectedSymbols, setOverwriteCheckBox } from '../../../reducers/Watchlist';

const WatchlistTopicUploadCSV = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { overwriteCheckBox, selectedSymbols } = useSelector(state => state.Watchlist);

  const loadFile = async file => {
    let text = await file.text();
    if (text) {
      dispatch(setWatchlistSelectedSymbols([]));
      const symbolsArr = text.split('\n');
      if (symbolsArr.length) {
        dispatch(setWatchlistSelectedSymbols(symbolsArr));
      }
    }
  };

  const onDrop = files => {
    if (files && files.length) {
      loadFile(files[0]);
    }
  };

  return (
    <div>
      <div className="dropzone">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="dz-message">
                <div className="dx-text">Try dropping some files here, or click to select files to upload.</div>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
      {selectedSymbols.length ? (
        <FormControl className={classes.formControl}>
          <TextField
            className="m-3"
            id="outlined-multiline-static"
            label="Symbols..."
            multiline
            rows="4"
            defaultValue=""
            variant="outlined"
            value={selectedSymbols.join(', ')}
            disabled={true}
          />
        </FormControl>
      ) : null}
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
    </div>
  );
};

export default WatchlistTopicUploadCSV;
