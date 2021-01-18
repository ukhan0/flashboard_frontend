import React, { useState } from 'react';
import { TextField, FormControl } from '@material-ui/core';
import useStyles from './WatchlistTopicStyles';


const WatchlistTopicPaste = () => {
  // const [ uploadedFiles, setUploadedFiles] = useState([])
  const classes = useStyles();

  return (
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
  );
};

export default WatchlistTopicPaste;
