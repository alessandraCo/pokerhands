import React from "react";
import "./App.css";
import { GameComponent } from "./Game";

function App() {
  //const game: Game = new Game();
  // game.winnerHand(
  //   new Hand("defaul player1"),
  //   new Hand("defaul player2")
  // );

  return (
    <div>
      <GameComponent />
    </div>
  );
}

export default App;
