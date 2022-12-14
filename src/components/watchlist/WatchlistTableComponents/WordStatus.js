import React from 'react';
import { changeWordStyler } from '../WatchlistTableHelpers';
export default function WordStatus(props) {
  const colorStyles = changeWordStyler(props.value ? props.value.word : null);
  return (
    <div className="text-center">
      {props.data.isColorEnable ? (
        <div className="badge" style={props.value ? (props.value.word ? colorStyles : {}) : null}>
          {props.value ? props.value.word : <></>}
        </div>
      ) : (
        <div style={props.value ? (props.value.word ? { textTransform: 'capitalize' } : {}) : null}>
          {props.value ? props.value.word : <></>}
        </div>
      )}
    </div>
  );
}
