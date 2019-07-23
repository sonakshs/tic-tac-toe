import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.handleResetButton = this.handleResetButton.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.minmax = this.minmax.bind(this);
    this.find_best_move = this.find_best_move.bind(this);
    this.hasMovesLeft = this.hasMovesLeft.bind(this);
    this.winner = this.winner.bind(this);
    this.arrayToMat = this.arrayToMat.bind(this);
    this.chooseRandomPlayers = this.chooseRandomPlayers.bind(this);
    
    this.state = {
      text: 'Starting Game...',
      human_symbol: 'O',
      computer_symbol: 'X',
      o_turn: true,
      board: ["", "", "", "", "", "", "", "", ""],
    };
  }

  handleCellClick(index, keep_playing) {
    if (this.state.board[index] === "" && keep_playing === true) {
      let update_board = this.state.board;
      update_board[index] = this.state.human_symbol;
      this.setState({
        board: update_board,
        text: "("+this.state.computer_symbol+") Computer's turn"
      });
      if(!this.hasMovesLeft){
        this.setState({text: 'Draw'})
      }
      let ai_index = this.find_best_move(update_board);
      if (ai_index !== -4) update_board[ai_index] = this.state.computer_symbol; 
      this.setState({
        board: update_board,
        text: "("+this.state.human_symbol+") Your turn"
      });  
      if(!this.hasMovesLeft){
        this.setState({text: 'Draw'})
      }
    } 
  }

  winner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i];
      if (squares[a] !== "" && squares[a] === squares[b] && squares[a] === squares[c] && squares[b] === squares[c])
        return squares[a];
    }
    return null;
  }

  arrayToMat(squares) {
    let mat = []
    let k = 0;

    for (let i = 0; i < 3; i++) {
      mat[i] = [];
      for (let j = 0; j < 3; j++) mat[i][j] = squares[k++];
    }

    return mat;
  }

  hasMovesLeft(mat) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (mat[i][j] === "") return true;
      }
    }
    this.setState({text: 'Draw!!!'})
    return false;
  }

  evaluate(mat, depth) {
    for (let i = 0; i < 3; i++) {
      if (mat[i][0] === mat[i][1] && mat[i][0] === mat[i][2] && mat[i][1] === mat[i][2]) {
        if (mat[i][0] === this.state.computer_symbol) return 100 - depth;
        if (mat[i][0] === this.state.human_symbol) return depth - 100;
      }
    }
    for (let j = 0; j < 3; j++) {
      if (mat[0][j] === mat[1][j] && mat[0][j] === mat[2][j] && mat[1][j] === mat[2][j]) {
        if (mat[0][j] === this.state.computer_symbol) return 100 - depth;
        if (mat[0][j] === this.state.human_symbol) return depth - 100;
      }
    }
    if (mat[0][0] === mat[1][1] && mat[0][0] === mat[2][2] && mat[1][1] === mat[2][2]) {
      if (mat[0][0] === this.state.computer_symbol) return 100 - depth;
      if (mat[0][0] === this.state.human_symbol) return depth - 100;
    }
    if (mat[0][2] === mat[1][1] && mat[0][2] === mat[2][0] && mat[1][1] === mat[2][0]) {
      if (mat[0][2] === this.state.computer_symbol) return 100 - depth;
      if (mat[0][2] === this.state.human_symbol) return depth - 100;
    }
    return 0;
  }

  minmax(mat, depth, get_max) {
    if (this.hasMovesLeft(mat) === false) {
      return this.evaluate(mat, depth);    
    } 
    let val = this.evaluate(mat, depth);
    if (val !== 0) return val;
    if (get_max) {
      let best = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (mat[i][j] === "") {
            mat[i][j] = this.state.computer_symbol;
            best = Math.max(best, this.minmax(mat, depth+1, !get_max));
            mat[i][j] = "";
          }
        }
      }
      return best;
    }
    else {
      let best = Infinity; 
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (mat[i][j] === "") {
            mat[i][j] = this.state.human_symbol;
            best = Math.min(best, this.minmax(mat, depth+1, !get_max));
            mat[i][j] = "";
          }
        }
      }
      return best;
    }
  }

  find_best_move(squares) {
    let mat = this.arrayToMat(squares);
    let val, row = -1, col = -1, best = -Infinity;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (mat[i][j] === "") {
          mat[i][j] = this.state.computer_symbol;
          val = this.minmax(mat, 0, false);
          mat[i][j] = "";
          if (val > best) {
            best = val;
            row = i;
            col = j;
          }
        }
      }
    }
    return (3 * row) + col;
  }

  handleResetButton() {
    this.setState({
      text: '(O) Your turn',
      human_symbol: 'O',
      computer_symbol: 'X',
      o_turn: true,
      board: ["", "", "", "", "", "", "", "", ""]
    })
    this.chooseRandomPlayers();
  }
  chooseRandomPlayers(){
    let chance = Math.random() > 0.5 ? "computer" : "human";
    if(chance === "computer"){
      this.setState({
        computer_symbol: 'O',
        human_symbol: 'X'
      })
      let update_board = this.state.board;
      let ai_index = this.find_best_move(update_board);
      if (ai_index !== -4) update_board[ai_index] = 'O'; 
      this.setState({
        board: update_board,
        text: '(X)Your turn'
      });  
    }
    else{
      this.setState({
        computer_symbol: 'X',
        human_symbol: 'O',
        text: '(O)Your turn'
      })
    }
  }
  componentDidMount(){
    this.chooseRandomPlayers();
  }
  render() {
    let text = this.state.text
    let have_winner = this.winner(this.state.board);
    let keep_playing = have_winner === null ? true : false;
    if (have_winner !== null) {
      text = have_winner + " won!"
    }
    if (!this.hasMovesLeft) {
      text = "Draw!!!"
    }
    return (
      <div className="master">
        <div className="game">
          <div className="board">
            {this.state.board.map((cell, index) => {
              return <div className="square" key={index} onClick={() => this.handleCellClick(index, keep_playing)}> {cell} </div>
            })}
          </div>
        </div>
        <div className="message-text">{text}</div>
        
        <div className="side-bar">
          <div className="button-line">
            <div className="active-button" onClick={()=>this.handleResetButton()}> Reset </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;