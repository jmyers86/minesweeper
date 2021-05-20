import "./App.css";
import { useState } from "react";

function App() {
  const [state, setState] = useState({
    id: null,
    board: [],
    state: "new",
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

  function handleCellClick(x, y) {
    console.log(x, y);
  }

  return (
    <div>
      <h1>Minesweeper</h1>
      {state.id ? (
        <div className="row">
          {state.board.map((row, y) => (
            <div>
              {row.map((cell, x) => (
                <div className="cell" onClick={() => handleCellClick(x, y)}>
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
    </div>
  );
}

export default App;
