import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

export default function AddRemoveIcon(props) {
  return (
    <div className="text-center">
      <Button>{props.value ? <AddIcon /> : <DeleteIcon />}</Button>
    </div>
  );
}
