import Hand, { HandComponent } from "./Hand";
import React from "react";

class Game {
  //method to compare two hands with the same ranking and the same max value
  public sameMaxValue(hand1: Hand, hand2: Hand): Hand | undefined {
    //sorting cardMap by its key from highest to lowest
    const map1 = hand1.getMap();
    const keys1 = [...map1.keys()];
    const sortedKey1 = keys1.sort((a, b) => b - a);
    const map2 = hand2.getMap();
    const keys2 = [...map2.keys()];
    const sortedKey2 = keys2.sort((a, b) => b - a);
    //getting hands same value
    let sameValue = hand1.getHandValue();
    for (let i = 0; i < sortedKey1.length; i++) {
      if (
        sortedKey1[i] !== sameValue &&
        sortedKey2[i] !== sameValue &&
        sortedKey1[i] > sortedKey2[i]
      ) {
        hand1.setHandValue(sortedKey1[i]);
        return hand1;
      } else if (
        sortedKey1[i] !== sameValue &&
        sortedKey2[i] !== sameValue &&
        sortedKey1[i] < sortedKey2[i]
      ) {
        hand2.setHandValue(sortedKey2[i]);
        return hand2;
      }
    }
    return undefined;
  }

  public winnerHand(hand1: Hand, hand2: Hand): Hand | undefined {
    //printing hands:
    console.log("------------");
    console.log(hand1.getPlayer() + ": ");
    //hand1.printHand();
    console.log();
    console.log("------------");
    console.log(hand2.getPlayer() + ": ");
    //hand2.printHand();
    console.log();
    console.log("------------");
    //initializing winner
    let winnerHand;
    if (hand1.getRanking() > hand2.getRanking()) {
      //first player wins
      winnerHand = hand1;
    } else if (hand1.getRanking() === hand2.getRanking()) {
      //same ranking: compare high values
      if (hand1.getHandValue() > hand2.getHandValue()) {
        //first player wins with high value
        winnerHand = hand1;
      } else if (hand1.getHandValue() === hand2.getHandValue()) {
        //same max value
        winnerHand = this.sameMaxValue(hand1, hand2);
      } else {
        //second player wins with high value
        winnerHand = hand2;
      }
    } else {
      //second player wins
      winnerHand = hand2;
    }
    if (winnerHand !== undefined) {
      console.log("*******************");
      console.log(winnerHand.getPlayer() + " wins!");
      console.log("*******************");
      winnerHand.printRankingString();
      winnerHand.printHandValueSymbol();
      return winnerHand;
    } else {
      console.log("It's a Tie!");
      return undefined;
    }
  }
}

export default Game;

export function GameComponent() {
  //using state to save players points
  const [poits, setPoits] = React.useState({
    firstPlayer: 0,
    secondPlayer: 0,
  });

  function resetPoints() {
    setPoits({
      firstPlayer: 0,
      secondPlayer: 0,
    });
  }

  function updatePoits() {
    setPoits((prevPoints) => {
      //case tie
      if (winner === undefined) {
        return { ...prevPoints };
      } else {
        return winner === firstHand
          ? {
              ...prevPoints,
              firstPlayer: prevPoints.firstPlayer + 1,
            }
          : {
              ...prevPoints,
              secondPlayer: prevPoints.secondPlayer + 1,
            };
      }
    });
  }

  const game: Game = new Game();
  const firstHand: Hand = new Hand("player1");
  const secondHand: Hand = new Hand("player2");
  const winner = game.winnerHand(firstHand, secondHand);
  return (
    <div className="background-board">
      <div className="board">
        <h1>Poker Hands</h1>
        <h3>{firstHand.getPlayer()}</h3>
        <div className="hand-component">
          <HandComponent hand={firstHand} />
        </div>
        <h3>{secondHand.getPlayer()}</h3>
        <div className="hand-component">
          <HandComponent hand={secondHand} />
        </div>
        <div className="console">
          <div className="scores">
            <h3>Scores:</h3>
            <h3>
              {firstHand.getPlayer()}: {poits.firstPlayer !==0 && <span>{poits.firstPlayer}</span>}
            </h3>
            <h3>
              {secondHand.getPlayer()}: {poits.secondPlayer !==0 && <span>{poits.secondPlayer}</span>}
            </h3>
          </div>
          <div className="winner-props">
            {winner === undefined && <h1>It's a Tie!</h1>}
            {winner !== undefined && <h1>{winner?.getPlayer()} wins!</h1>}
            {winner !== undefined && (
              <h2>for: {winner?.printRankingString()}</h2>
            )}
            {winner !== undefined && (
              <h2>with value: {winner?.printHandValueSymbol()}</h2>
            )}
          </div>
          <div className="buttons">
            <button onClick={updatePoits}>Go</button>
            <button onClick={resetPoints}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
