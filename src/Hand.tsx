import { CardComponent, Values } from "./Card";
import Card from "./Card";
import Deck from "./Deck";
import "./Hand.css";

export enum Ranking {
  highCard = 0,
  pair,
  twoPairs,
  threeOfAKind,
  straight,
  flush,
  fullHouse,
  fourOfAKind,
  straightFlush,
}

class Hand {
  //new random hand initialized
  //player nickname
  private player: string;
  //5 cards hand
  public cards: [Card, Card, Card, Card, Card] = this.generateRandomHand(); //genereting a random hand ;
  //hand map (key: card value; value: number of cards with the same value)
  private cardsMap: Map<Values, number> = this.generateCardsMap();
  //hand ranking (high card, pair, two pairs, three of a kind, straight, flush, full house, four of a kind, straight flush)
  private ranking: Ranking = this.checkRanking();
  //highest value
  private handValue: number = this.checkHandValue();

  //first constructor: inizialize player
  constructor(player: string) {
    this.player = player;
  }

  //second constructor: replacing a hand with a specific set of five cards (used in testing)
  public static newSpecificHand(
    player: string,
    card1: Card,
    card2: Card,
    card3: Card,
    card4: Card,
    card5: Card
  ): Hand {
    let hand = new Hand(player);
    hand.player = player;
    hand.cards = hand.generateHand(card1, card2, card3, card4, card5);
    hand.cardsMap = hand.generateCardsMap();
    hand.ranking = hand.checkRanking();
    hand.handValue = hand.checkHandValue();
    return hand;
  }

  //generating hand
  private generateHand(
    card1: Card,
    card2: Card,
    card3: Card,
    card4: Card,
    card5: Card
  ): [Card, Card, Card, Card, Card] {
    return [card1, card2, card3, card4, card5];
  }

  //generating random hand taking 5 cards from a shuffled deck
  private generateRandomHand(): [Card, Card, Card, Card, Card] {
    const deck = new Deck();
    let randomHand = deck.cards.slice(0, 5);
    return this.generateHand(
      randomHand[0],
      randomHand[1],
      randomHand[2],
      randomHand[3],
      randomHand[4]
    );
  }

  //generating card map
  private generateCardsMap(): Map<Values, number> {
    let map = new Map<Values, number>();
    this.cards.forEach((card) => {
      const cardValue = card.getValue();
      //if the card value is already in map keys
      if (map.has(cardValue)) {
        let count = map.get(cardValue);
        if (count !== undefined) {
          map.set(cardValue, count + 1);
        }
      }
      //if the card value isn't in the map keys
      else {
        map.set(cardValue, 1);
      }
    });
    //returning a sorted by value map in crescent order
    const sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    return sortedMap;
  }

  //returning card map
  public getMap(): Map<Values, number> {
    return this.cardsMap;
  }

  //returning player name
  public getPlayer() {
    return this.player;
  }

  //returning num of cards in a hand
  public getHandCardsNumber() {
    return this.cards.length;
  }

  //returning true if the 5 cards are all same suits (false otherwise)
  private checkAllSameSuit(): boolean {
    const firstCardSuit = this.cards[0].getSuit();
    for (let i = 1; i < 5; i++) {
      if (this.cards[i].getSuit() !== firstCardSuit) {
        return false;
      }
    }
    return true;
  }

  //returns the maximum value in the five cards hand
  private findMaxValue(): number {
    //saving the first card value as the temporary max value
    let maxValue: number = this.cards[0].getValue();
    for (let i = 1; i < 5; i++) {
      if (this.cards[i].getValue() > maxValue) {
        maxValue = this.cards[i].getValue();
      }
    }
    return maxValue;
  }

  //returns true if the five cards values are a straight, false otherwise
  private checkStraight(): boolean {
    //sorting cards by their value from lowest to highest
    const sortedCards = this.cards.sort(function (a, b) {
      return a.getValue() - b.getValue();
    });
    // console.log("sorted cards: ");
    // sortedCards.forEach(card => card.printCard());
    //currentCardValue is equal to the lowest value
    let currentCardValue = sortedCards[0].getValue();
    //console.log("current sorted card value: " + currentCardValue);
    //if the next value is not equal to the consecutive of the previous one, the for stops and returns false
    for (let i = 1; i < this.cards.length; i++) {
      //console.log("current sorted card value: " + sortedCards[i].getValue());
      if (sortedCards[i].getValue() !== currentCardValue + 1) {
        //console.log("different from: " + (currentCardValue + 1));
        return false;
      } else {
        currentCardValue++;
      }
    }
    return true;
  }

  //gets hand ranking
  private checkRanking(): Ranking {
    const sameSuit: boolean = this.checkAllSameSuit();
    const isAStraight: boolean = this.checkStraight();
    //if Cards are same suit
    if (sameSuit && isAStraight) {
      return Ranking.straightFlush; //Straight Flush (same suit and straight)
    } else if (sameSuit) {
      return Ranking.flush; //Flush (same suit)
    } else if (isAStraight) {
      return Ranking.straight; //Straight
    }
    //if cards are not same suit
    else {
      let tempRanking: Ranking | undefined = undefined;
      for (const numOfSameValues of this.cardsMap.values()) {
        //console.log("temp ranking: " + tempRanking);
        //console.log("inizio numofsamevalues: " + numOfSameValues);
        //four cards with same value
        if (numOfSameValues === 4) {
          return Ranking.fourOfAKind; //Four of a Kind (4 cards with the same value)
        } else if (numOfSameValues === 3) {
          //three cards with the same value
          tempRanking = Ranking.threeOfAKind;
        } else if (numOfSameValues === 2) {
          //two cards with the same value
          if (tempRanking === Ranking.threeOfAKind) {
            //3 cards with the same value and a pair
            return Ranking.fullHouse; //Full House (3 cards with the same value and a pair)
          } else if (tempRanking === Ranking.pair) {
            //second pair found
            return Ranking.twoPairs; //Two pairs
          } else {
            //numOfSameValues = 2 at first iteration: it can be a pair or a two pairs
            tempRanking = Ranking.pair;
          }
        } else {
          //numOfSameValue === 1
          if (tempRanking === Ranking.pair) {
            return Ranking.pair; //Pair
          } else if (tempRanking === Ranking.threeOfAKind) {
            return Ranking.threeOfAKind; //Three of a Kind
          } else {
            //numOfSameValues = 1 at first iteration: no cards with same value
            return Ranking.highCard; //High Card
          }
        }
      }
      return Ranking.highCard;
    }
  }

  //returns ranking
  public getRanking(): Ranking {
    return this.ranking;
  }

  //gets hand value
  private checkHandValue(): number {
    const ranking = this.getRanking();
    if (
      ranking === Ranking.flush ||
      ranking === Ranking.straight ||
      ranking === Ranking.straightFlush ||
      ranking === Ranking.highCard
    ) {
      return this.findMaxValue();
    }
    let tempMaxValue: number = 0;
    this.cardsMap.forEach(function (value, key) {
      //console.log("value: " + value + " key: " + key);
      if (value === 4 || value === 3) {
        //console.log("the hand value is: " + key);
        tempMaxValue = key;
      } else if (value === 2) {
        if (ranking === Ranking.pair) {
          //console.log("the hand value is: " + key);
          tempMaxValue = key;
        } else if (ranking === Ranking.twoPairs && tempMaxValue === undefined) {
          tempMaxValue = key;
        } else {
          if (tempMaxValue !== undefined && tempMaxValue > key) {
            //console.log("the hand value is: " + tempMaxValue);
          } else {
            //console.log("the hand value is: " + key);
            tempMaxValue = key;
          }
        }
      }
    });
    //console.log("Final! The hand value is: " + tempMaxValue);
    return tempMaxValue;
  }
  //prints ranking symbol
  public printRankingString() : string {
    let rankingString: string;
    switch (this.getRanking()) {
      case Ranking.highCard:
        rankingString = "High Card";
        break;
      case Ranking.pair:
        rankingString = "Pair";
        break;
      case Ranking.twoPairs:
        rankingString = "Two Pairs";
        break;
      case Ranking.threeOfAKind:
        rankingString = "Three of a Kind";
        break;
      case Ranking.straight:
        rankingString = "Straight";
        break;
      case Ranking.flush:
        rankingString = "Flush";
        break;
      case Ranking.fullHouse:
        rankingString = "Full house";
        break;
      case Ranking.fourOfAKind:
        rankingString = "Four of a Kind";
        break;
      case Ranking.straightFlush:
        rankingString = "Straight Flush";
        break;
    }
    console.log("Hand ranking: " + rankingString);
    return rankingString;
  }

  //returns highest value
  public getHandValue() {
    return this.handValue;
  }

  //setting hands value
  public setHandValue(newValue: number) {
    this.handValue = newValue;
  }

  //prints highest value symbol
  public printHandValueSymbol() : string {
    let valueSymbol = "";
    const effectiveValue = this.getHandValue();
    switch (effectiveValue) {
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
      effectiveValue === Values.T ||
      effectiveValue === Values.J ||
      effectiveValue === Values.Q ||
      effectiveValue === Values.K ||
      effectiveValue === Values.A
    ) {
      console.log("with value: " + valueSymbol);
      return valueSymbol;
    } else {
      console.log("with value: " + effectiveValue);
      return effectiveValue.toString();
    }
  }

  //printing hand
  public printHand() {
    this.cards.forEach((card) => {
      card.printCard();
    });
  }
}

export function HandComponent(promps: { hand: Hand }) {
  let i = -1;
  const handCards = promps.hand.cards.map((card) => {
    i++;
    return (
      <CardComponent suit={card.getSuit()} value={card.getValue()} key={i} />
    );
  });
  return <div className="hand-component">{handCards}</div>;
}

export default Hand;
