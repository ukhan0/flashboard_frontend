import React, { useState } from 'react';
import { TextField, FormControl } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import useStyles from './WatchlistTopicStyles';

const WatchlistTopicUploadCSV = () => {
  // const [ uploadedFiles, setUploadedFiles] = useState([])
  const classes = useStyles();

  const onDrop = (files) => {
    console.log(files)
    // this.setState({ files });
  };

  const onCancel = () => {
    console.log('onCancel');
    // this.setState({ files: [] });
  };

  return (
    <div>
      <div className="dropzone">
        <Dropzone onDrop={onDrop} onFileDialogCancel={onCancel}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="dz-message">
                <div className="dx-text">
                  Try dropping some files here, or click to select files to
                  upload.
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
      <FormControl className={classes.formControl}>
        <TextField
          className="m-3"
          id="outlined-multiline-static"
          label="Symbols..."
          multiline
          rows="4"
          defaultValue=""
          variant="outlined"
        />
      </FormControl>
    </div>
  );
};

export default WatchlistTopicUploadCSV;
