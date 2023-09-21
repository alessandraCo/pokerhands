import { Suits, Values } from "./Card";
import Card from "./Card";

class Deck {
  //52 cards
  public cards: Card[];

  //generating a shuffled deck
  public constructor() {
    //creating a new deck of 52 cards
    this.cards = this.createNewDeck();
    //shuffle the deck
    this.shuffle();
  }

  public getNumOfCards() {
    return this.cards.length;
  }

  //creates a new deck of 52 cards using the cartesian product between Suits and Values
  public createNewDeck(): Card[] {
    //flatMap: concates the 4 arrays (each one for a different Suit) of 13 cards in a single array of 52 cards
    return Object.keys(Suits).flatMap((suit) => {
        return Object.values(Values)
        //that's because Values is a numeric Enum, so I need to take only the numeric values
        .filter((v) => isNaN(Number(v)))
        .map((value) => {
            //from strings to Enum
          const suitString = suit as keyof typeof Suits;
          const valueString = value as keyof typeof Values;
          let suitEnum = Suits[suitString];
          let valueEnum = Values[valueString];
          return new Card(suitEnum, valueEnum);
        });
    });
  }

  //generates a random index and swaps the two cards
  public shuffle() {
    const numOfCards = this.getNumOfCards();
    for (let i = numOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

export default Deck;
