import "./App.css";
import { useState } from "react";

function App() {
  const [state, setState] = useState({
    id: null,
    board: [],
    state: "none",
    mines: 0,
  });

  // Set up useState Here
  async function handleNewGameClick() {
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games?difficulty=0`,
      {
        method: "POST",
      }
    );
    const game = await response.json();
    setState(game);
  }

  async function handleCellClick(x, y) {
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${state.id}/check?row=${y}&col=${x}`,
      {
        method: "POST",
      }
    );
    const game = await response.json();
    setState(game);
  }

  async function handleCellRightClick(x, y) {
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${state.id}/flag?row=${y}&col=${x}`,
      {
        method: "POST",
      }
    );
    const game = await response.json();
    setState(game);
  }

  function getClassName(cell) {
    switch (cell) {
      case " ":
        return "unrevealed";
      case "_":
        return "revealed";
      case "*":
        return "bomb";
      case "F":
        return "flag";
      case "@":
        return "flagged-bomb";
      default:
        return "number";
    }
  }

  function cellIcon(cell) {
    switch (cell) {
      case "*":
        return <i className="fas fa-flag"></i>;
      default:
        return "number";
    }
  }

  return (
    <div>
      <h1>Minesweeper</h1>
      {state.id ? (
        <div>
          {state.board.map((row, y) => (
            <div key={y} className="row">
              {row.map((cell, x) => (
                <div
                  key={x}
                  className={`cell ${getClassName(cell)}`}
                  onClick={() => handleCellClick(x, y)}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    handleCellRightClick(x, y);
                  }}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <button className="new-game" onClick={handleNewGameClick}>
          New Game!
        </button>
      )}
      <h2>{state.state}</h2>
      {(state.state === "lost" || state.state === "won") && (
        <button onClick={handleNewGameClick}>Play again!</button>
      )}
    </div>
  );
}

export default App;
