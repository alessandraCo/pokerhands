import "./Card.css";
import clubs from "./img/clubs.png";
import spades from "./img/spades.png";
import hearts from "./img/hearts.png";
import diamonds from "./img/diamonds.png";

export enum Suits {
  CLUBS = "Clubs",
  DIAMONDS = "Diamonds",
  SPADES = "Spades",
  HEARTS = "Hearts",
}

export enum Values {
  two = 2,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  T,
  J,
  Q,
  K,
  A,
}

class Card {
  private suit: Suits;
  private value: Values;

  //multiple constructor with factory method
  public constructor(suit: Suits, value: Values) {
    this.suit = suit;
    this.value = value;
  }

  public getSuit() {
    return this.suit;
  }

  public getValue() {
    return this.value;
  }

  public printCard() : void {
    let suitSymbol;
    switch (this.suit) {
      case Suits.CLUBS:
        suitSymbol = "♣";
        break;
      case Suits.DIAMONDS:
        suitSymbol = "♢";
        break;
      case Suits.SPADES:
        suitSymbol = "♠";
        break;
      case Suits.HEARTS:
        suitSymbol = "♡";
        break;
    }
    let valueSymbol;
    switch (this.value) {
      case Values.T:
        valueSymbol = "T";
        break;
      case Values.J:
        valueSymbol = "J";
        break;
      case Values.Q:
        valueSymbol = "Q";
        break;
      case Values.K:
        valueSymbol = "K";
        break;
      case Values.A:
        valueSymbol = "A";
        break;
    }
    if (
      this.value === Values.T ||
      this.value === Values.J ||
      this.value === Values.Q ||
      this.value === Values.K ||
      this.value === Values.A
    ) {
      process.stdout.write(valueSymbol + suitSymbol + " ");
    } else {
      process.stdout.write(this.value + suitSymbol + " ");
    }
  }
}

export function CardComponent(promps: { suit: Suits; value: Values }) {
  let img = "";
  switch (promps.suit) {
    case Suits.CLUBS:
      img = clubs;
      break;
    case Suits.DIAMONDS:
      img = diamonds;
      break;
    case Suits.SPADES:
      img = spades;
      break;
    case Suits.HEARTS:
      img = hearts;
      break;
  }
  let valueSymbol = "";
  switch (promps.value) {
    case Values.two:
      valueSymbol = "2";
      break;
    case Values.three:
      valueSymbol = "3";
      break;
    case Values.four:
      valueSymbol = "4";
      break;
    case Values.five:
      valueSymbol = "5";
      break;
    case Values.six:
      valueSymbol = "6";
      break;
    case Values.seven:
      valueSymbol = "7";
      break;
    case Values.eight:
      valueSymbol = "8";
      break;
    case Values.nine:
      valueSymbol = "9";
      break;
    case Values.T:
      valueSymbol = "T";
      break;
    case Values.J:
      valueSymbol = "J";
      break;
    case Values.Q:
      valueSymbol = "Q";
      break;
    case Values.K:
      valueSymbol = "K";
      break;
    case Values.A:
      valueSymbol = "A";
      break;
  }
  return (
    <div className="card-component">
      <div className="card-value" id="card-value-right">
        {valueSymbol}
        <img className="card-suit-img-corner" src={img} alt="clubs" />
      </div>
      <img className="card-suit-img" src={img} alt="clubs" />
      <div className="card-value" id="card-value-left">
        {valueSymbol}
        <img className="card-suit-img-corner" src={img} alt="clubs" />
      </div>
    </div>
  );
}

export default Card;
