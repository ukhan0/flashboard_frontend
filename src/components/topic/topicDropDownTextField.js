import React from 'react';
import { TextField,MenuItem } from '@material-ui/core';

  const documentType=[
      {
          value:"all",
          label:"All"
      },
      {
        value:"some",
        label:"Some"
    },
  ]
const TopicTextField = (props) => {
    const [value, setValue] = React.useState("all");

  return (
    <TextField
    size="small"
    fullWidth
    select
    value={value}
    onChange={(text)=>{setValue(text.target.value)}}
    variant="outlined">
    {documentType.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
  );
};
export default TopicTextField;
