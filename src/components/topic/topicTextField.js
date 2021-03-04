import React from 'react';
import { TextField } from '@material-ui/core';

const TopicTextField = (props) => {
    const [value, setValue] = React.useState("");

  return (
    <TextField
    size="small"
      fullWidth
      placeholder={props.text}
      value={value}
      onChange={(text)=>{setValue(text.target.value)}}
      variant="outlined"
    />
  );
};
export default TopicTextField;
