import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: new Array(9).fill(null)
      }],
      positions: [],
      stepNumber: 0,
      xIsNext: true,
      descending: false,
      whoWon: null
    };

    this.calculateWinner = this.calculateWinner.bind(this);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const positions = this.state.positions.slice(0, this.state.stepNumber);
    const current = history[history.length - 1];
    const squares = current.squares.slice();


    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.whoIsNext();

    this.setState({
      history: [...history, { squares }],
      positions: [...positions, calculatePosition(i)],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  whoIsNext() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  reverseList() {
    this.setState({descending: !this.state.descending});
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let set = new Set();
    let player;

    for (let i = 0; i < lines.length; i++) {
      let [ a, b, c ] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          set.add(a)
             .add(b)
             .add(c);
        player = a;
      }
    }

    this.winners = set;

    return squares[player];
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + this.whoIsNext();

      if (this.state.stepNumber === 9) {
         status = 'Draw';
      }
    }

    const moves = history.map((step, move) => {
      let desc;

      if (move) {
        const { x, y } = this.state.positions[move - 1];
        desc = `Move ${move % 2 ? 'X' : 'O'} : (${x}, ${y})`
      } else {
        desc = 'Game start';
      }

      if (this.state.stepNumber === move) {
        desc = <b>{desc}</b>
      }

      return (
        <li key={move}>
          <a href="#" onClick={(e) => {e.preventDefault(); this.jumpTo(move);}}>
            <code>{desc}</code>
          </a>
        </li>
      );
    });

    if (this.state.descending) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            isHighlighted={this.winners}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
          <button onClick={this.reverseList.bind(this)}>Reverse the list</button>
        </div>
      </div>
    );
  }
}

function calculatePosition(square) {
  const x = square % 3 + 1;
  const y = Math.floor(square / 3) + 1;

  return {x, y};
}