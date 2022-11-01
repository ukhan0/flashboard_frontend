import React from 'react';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';

export default function TopicSaveDialog(props) {
  const { searchText } = useSelector(state => state.Topic);
  const handleChange = e => {
    props.onTopicSelect(e.target.value);
  };

  return (
    <div style={{ width: 400 }}>
      <b className="text-first mb-2">Search Label</b>
      <TextField size="small" fullWidth onChange={handleChange} variant="outlined" />
      <div className="mt-3 text-black-50">Search Text: {searchText}</div>
    </div>
  );
}
