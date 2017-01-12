import React from 'react';

export default function Square(props) {
  let style;
  if (props.isHighlighted) {
    style = {
      background: 'green'
    };
  }
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
      style={style}
    >
      {props.value}
    </button>
  );
}