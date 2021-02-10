import React from 'react';
import { connect } from 'react-redux';
import { TextField, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import useStyles from './WatchlistTopicStyles';
import { setWatchlistSelectedSymbols, setOverwriteCheckBox } from '../../../reducers/Watchlist';

const WatchlistTopicUploadCSV = props => {
  const { selectedSymbols, setWatchlistSelectedSymbols, overwriteCheckBox, setOverwriteCheckBox } = props;
  const classes = useStyles();

  const loadFile = async file => {
    let text = await file.text();
    if (text) {
      setWatchlistSelectedSymbols([]);
      const symbolsArr = text.split('\n');
      if (symbolsArr.length) {
        setWatchlistSelectedSymbols(symbolsArr);
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
              setOverwriteCheckBox(!overwriteCheckBox);
            }}
          />
        }
        label="Overwrite old values"
      />
    </div>
  );
};

const mapStateToProps = state => ({
  selectedSymbols: state.Watchlist.selectedSymbols,
  checkBox: state.Watchlist.checkBox
});

const mapDispatchToProps = dispatch => ({
  setWatchlistSelectedSymbols: value => dispatch(setWatchlistSelectedSymbols(value)),
  setOverwriteCheckBox: value => dispatch(setOverwriteCheckBox(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistTopicUploadCSV);
