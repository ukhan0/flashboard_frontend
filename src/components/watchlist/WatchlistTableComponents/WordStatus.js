import React from 'react';
import { changeWordStyler } from '../WatchlistTableHelpers';

export default function WordStatus(props) {
  const colorStyles = changeWordStyler(props.value);
  return (
    <div className="text-center">
      <div className="badge px-4" style={props.value ? colorStyles : {}}>
        {props.value}
      </div>
    </div>
  );
}
