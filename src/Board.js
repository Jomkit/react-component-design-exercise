import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *    coord zeroed at upper left (0,0)
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values

    // Initialize # of empty arrays according to nrows
    for(let i = 0; i < nrows; i++){
      initialBoard.push([]);
      for(let j = 0; j < ncols; j++){
        initialBoard[i].push(Math.random() < chanceLightStartsOn ? true : false);
      }
    }
    
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // if every cell is false (not lit) then win
    return board.every(row => row.every(c => c == false));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          // Clicked cell
          boardCopy[y][x] = !boardCopy[y][x];

        }
      };

      const newBoard = oldBoard.map(row => [...row]);
      flipCell(y, x, newBoard);
      // top cell if not edge [y-1][x]
      flipCell(y-1, x, newBoard);
      // right cell if not edge [y][x+1]
      flipCell(y, x+1, newBoard);
      // bottom cell if not edge [y+1][x]
      flipCell(y+1, x, newBoard);
      // left cell if not edge [y][x-1]
      flipCell(y, x-1, newBoard);
      
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  { if(hasWon()) {
      return (
        <>
        <div className="Board-fireworks"></div>
        <h1 className="Board-win">You Win!</h1>
        </>
      )
    }
  }

  // TODO

  // make table board
  return (
    <div className="Board">
      <table>
        <tbody>
          {board.map((row, y) => 
            <tr key={y}>
              {row.map((c, x) => (
                <Cell 
                  key={`${y}-${x}`} 
                  flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} 
                  isLit={c} 
                />)
              )}
            </tr>
          )}
        </tbody>

      </table>
    </div>
  )
}

export default Board;
