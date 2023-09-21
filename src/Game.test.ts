import Game from "./Game";
import Hand, {Ranking} from "./Hand";
import Card, {Suits, Values} from "./Card";

test("check the winner is player2 for High Card with value A", () => {
    const card1 = new Card(Suits.HEARTS, Values.two);
    const card2 = new Card(Suits.DIAMONDS, Values.three);
    const card3 = new Card(Suits.SPADES, Values.five);
    const card4 = new Card(Suits.CLUBS, Values.nine);
    const card5 = new Card(Suits.DIAMONDS, Values.K);
    let hand1 : Hand = Hand.newSpecificHand("player1", card1, card2, card3, card4, card5);
    const card6 = new Card(Suits.CLUBS, Values.two);
    const card7 = new Card(Suits.HEARTS, Values.three);
    const card8 = new Card(Suits.SPADES, Values.four);
    const card9 = new Card(Suits.CLUBS, Values.eight);
    const card10 = new Card(Suits.HEARTS, Values.A);
    let hand2 : Hand = Hand.newSpecificHand("player2", card6, card7, card8, card9, card10);
    const game : Game = new Game();
    expect(game.winnerHand(hand1, hand2)).toEqual(hand2);
    expect(hand2.getRanking()).toEqual(Ranking.highCard);
    expect(hand2.getHandValue()).toBe(Values.A.valueOf());
});

test("check the winner is player1 for Full House with value 4", () => {
    const card1 = new Card(Suits.HEARTS, Values.four);
    const card2 = new Card(Suits.CLUBS, Values.four);
    const card3 = new Card(Suits.SPADES, Values.four);
    const card4 = new Card(Suits.HEARTS, Values.two);
    const card5 = new Card(Suits.DIAMONDS, Values.two);
    let hand1 : Hand = Hand.newSpecificHand("player1", card1, card2, card3, card4, card5);
    const card6 = new Card(Suits.SPADES, Values.two);
    const card7 = new Card(Suits.SPADES, Values.eight);
    const card8 = new Card(Suits.SPADES, Values.A);
    const card9 = new Card(Suits.SPADES, Values.Q);
    const card10 = new Card(Suits.SPADES, Values.three);
    let hand2 : Hand = Hand.newSpecificHand("player2", card6, card7, card8, card9, card10);
    const game : Game = new Game();
    expect(game.winnerHand(hand1, hand2)).toEqual(hand1);
    expect(hand1.getRanking()).toEqual(Ranking.fullHouse);
    expect(hand1.getHandValue()).toBe(Values.four);
    expect(hand2.getRanking()).toEqual(Ranking.flush);
    expect(hand2.getHandValue()).toBe(Values.A.valueOf());
});

test("check the winner is player1 for High Card with value 9", () => {
    const card1 = new Card(Suits.DIAMONDS, Values.K);
    const card2 = new Card(Suits.CLUBS, Values.nine);
    const card3 = new Card(Suits.SPADES, Values.five);
    const card4 = new Card(Suits.DIAMONDS, Values.three);
    const card5 = new Card(Suits.HEARTS, Values.two);
    let hand1 : Hand = Hand.newSpecificHand("player1", card1, card2, card3, card4, card5);
    const card6 = new Card(Suits.CLUBS, Values.two);
    const card7 = new Card(Suits.HEARTS, Values.three);
    const card8 = new Card(Suits.SPADES, Values.four);
    const card9 = new Card(Suits.CLUBS, Values.eight);
    const card10 = new Card(Suits.HEARTS, Values.K);
    let hand2 : Hand = Hand.newSpecificHand("player2", card6, card7, card8, card9, card10);
    const game : Game = new Game();
    expect(game.winnerHand(hand1, hand2)).toEqual(hand1);
    expect(hand1.getRanking()).toEqual(Ranking.highCard);
    expect(hand1.getHandValue()).toBe(Values.nine);
    expect(hand2.getRanking()).toEqual(Ranking.highCard);
});

test("check the winner is undefined becaouse of a tie", () => {
    const card1 = new Card(Suits.DIAMONDS, Values.K);
    const card2 = new Card(Suits.CLUBS, Values.nine);
    const card3 = new Card(Suits.SPADES, Values.five);
    const card4 = new Card(Suits.DIAMONDS, Values.three);
    const card5 = new Card(Suits.HEARTS, Values.two);
    let hand1 : Hand = Hand.newSpecificHand("player1", card1, card2, card3, card4, card5);
    const card6 = new Card(Suits.CLUBS, Values.two);
    const card7 = new Card(Suits.HEARTS, Values.three);
    const card8 = new Card(Suits.HEARTS, Values.five);
    const card9 = new Card(Suits.SPADES, Values.nine);
    const card10 = new Card(Suits.HEARTS, Values.K);
    let hand2 : Hand = Hand.newSpecificHand("player2", card6, card7, card8, card9, card10);
    const game : Game = new Game();
    expect(game.winnerHand(hand1, hand2)).toBeUndefined();
});

