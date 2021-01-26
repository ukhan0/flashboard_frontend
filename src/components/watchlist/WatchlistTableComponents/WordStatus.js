import React from 'react';
import { changeWordStyler } from '../WatchlistTableHelpers';

export default function WordStatus(props) {
  const colorStyles = changeWordStyler(props.value.word);
  return (
    <div className="text-center">
      <div className="badge" style={props.value.word ? colorStyles : {}}>
        {props.value.word}
      </div>
    </div>
  );
}
