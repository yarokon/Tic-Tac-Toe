import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {
  renderSquare(i) {
    return <Square
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)}
              isHighlighted={this.props.isHighlighted.has(i)}
              key={i}
            />;
  }

  render() {
    let board = [];

    for (let i = 0; i < 3; i++) {
      let row = [];

      for (let j = 0; j < 3; j++) {
        row.push(this.renderSquare(i * 3 + j));
      }

      board.push(<div key={i}>{row}</div>);
    }

    return (
      <div className="board">
        {board}
      </div>
    );
  }
}