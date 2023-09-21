import Card, { Suits, Values } from "./Card";
import Hand, { Ranking } from "./Hand";

test("Hand ranking is Flush", () => {
  const card1 = new Card(Suits.CLUBS, Values.four);
  const card2 = new Card(Suits.CLUBS, Values.Q);
  const card3 = new Card(Suits.CLUBS, Values.T);
  const card4 = new Card(Suits.CLUBS, Values.A);
  const card5 = new Card(Suits.CLUBS, Values.two);
  const testHandFlush: Hand = Hand.newSpecificHand("player", card1, card2, card3, card4, card5);
  expect(testHandFlush.getRanking()).toEqual(Ranking.flush);
});

test("Hand ranking is not Straight", () => {
  const card1 = new Card(Suits.CLUBS, Values.four);
  const card2 = new Card(Suits.CLUBS, Values.Q);
  const card3 = new Card(Suits.CLUBS, Values.T);
  const card4 = new Card(Suits.CLUBS, Values.A);
  const card5 = new Card(Suits.CLUBS, Values.two);
  const testHandFlush: Hand = Hand.newSpecificHand("player", card1, card2, card3, card4, card5);
  expect(testHandFlush.getRanking()).not.toEqual(Ranking.straight);
});

test("Hand ranking is Straight with high card equals to six", () => {
  const card6 = new Card(Suits.HEARTS, Values.four);
  const card7 = new Card(Suits.CLUBS, Values.three);
  const card8 = new Card(Suits.DIAMONDS, Values.five);
  const card9 = new Card(Suits.SPADES, Values.six);
  const card10 = new Card(Suits.CLUBS, Values.two);
  const testHandStraight: Hand = Hand.newSpecificHand("player", card6, card7, card8, card9, card10);
  expect(testHandStraight.getHandValue()).toBe(6);
  expect(testHandStraight.getRanking()).toEqual(Ranking.straight);
});

test("Hand ranking is Straight Flush with high card equals to A", () => {
  const card1 = new Card(Suits.HEARTS, Values.J);
  const card2 = new Card(Suits.HEARTS, Values.Q);
  const card3 = new Card(Suits.HEARTS, Values.T);
  const card4 = new Card(Suits.HEARTS, Values.A);
  const card5 = new Card(Suits.HEARTS, Values.K);
  const testStraightFlush: Hand = Hand.newSpecificHand("player", card1, card2, card3, card4, card5);
  expect(testStraightFlush.getRanking()).toEqual(Ranking.straightFlush);
  expect(testStraightFlush.getHandValue()).toBe(Values.A.valueOf());
});

test("Hand ranking is Four of a Kind with high card equals to 2", () => {
    const card1 = new Card(Suits.HEARTS, Values.two);
    const card2 = new Card(Suits.CLUBS, Values.two);
    const card3 = new Card(Suits.SPADES, Values.two);
    const card4 = new Card(Suits.DIAMONDS, Values.two);
    const card5 = new Card(Suits.HEARTS, Values.four);
    const testFourOfAKind: Hand = Hand.newSpecificHand("player", card1, card2, card3, card4, card5);
    expect(testFourOfAKind.getRanking()).toEqual(Ranking.fourOfAKind);
    expect(testFourOfAKind.getHandValue()).toBe(2);
  });

  test("Hand ranking is Full House with high card equals to 5", () => {
    const card1 = new Card(Suits.HEARTS, Values.five);
    const card2 = new Card(Suits.CLUBS, Values.five);
    const card3 = new Card(Suits.SPADES, Values.five);
    const card4 = new Card(Suits.DIAMONDS, Values.four);
    const card5 = new Card(Suits.HEARTS, Values.four);
    const testFullHouse: Hand = Hand.newSpecificHand("player", card1, card2, card3, card4, card5);
    expect(testFullHouse.getRanking()).toEqual(Ranking.fullHouse);
    expect(testFullHouse.getHandValue()).toBe(5);
  });

  test("Hand ranking is Three of a Kind with high card equals to 5", () => {
    const card1 = new Card(Suits.HEARTS, Values.five);
    const card2 = new Card(Suits.CLUBS, Values.five);
    const card3 = new Card(Suits.SPADES, Values.five);
    const card4 = new Card(Suits.DIAMONDS, Values.eight);
    const card5 = new Card(Suits.HEARTS, Values.two);
    const testThreeOfAKind: Hand = Hand.newSpecificHand("player", card1, card2, card3, card4, card5);
    expect(testThreeOfAKind.getRanking()).toEqual(Ranking.threeOfAKind);
    expect(testThreeOfAKind.getHandValue()).toBe(5);
  });

  test("Hand ranking is Pair with high card equals to K", () => {
    const card1 = new Card(Suits.HEARTS, Values.K);
    const card2 = new Card(Suits.DIAMONDS, Values.K);
    const card3 = new Card(Suits.SPADES, Values.Q);
    const card4 = new Card(Suits.DIAMONDS, Values.T);
    const card5 = new Card(Suits.HEARTS, Values.J);
    const testPair: Hand = Hand.newSpecificHand("player", card1, card2, card3, card4, card5);
    expect(testPair.getRanking()).toEqual(Ranking.pair);
    expect(testPair.getHandValue()).toBe(Values.K.valueOf());
  });

  test("Hand ranking is Two Pairs with high card equals to Q", () => {
    const card1 = new Card(Suits.HEARTS, Values.J);
    const card2 = new Card(Suits.DIAMONDS, Values.J);
    const card3 = new Card(Suits.SPADES, Values.Q);
    const card4 = new Card(Suits.DIAMONDS, Values.Q);
    const card5 = new Card(Suits.HEARTS, Values.J);
    const testNotTwoPair: Hand = Hand.newSpecificHand("player", card1, card2, card3, card4, card5);
    expect(testNotTwoPair.getRanking()).not.toEqual(Ranking.twoPairs);
    expect(testNotTwoPair.getRanking()).toEqual(Ranking.fullHouse);
    const card6 = new Card(Suits.HEARTS, Values.four);
    const testTwoPair: Hand = Hand.newSpecificHand("player", card6, card2, card3, card4, card5);
    expect(testTwoPair.getRanking()).toEqual(Ranking.twoPairs);
    expect(testTwoPair.getHandValue()).toBe(Values.Q.valueOf());
  });

  test("Hand ranking is High Card with high card equals to T", () => {
    const card1 = new Card(Suits.HEARTS, Values.two);
    const card2 = new Card(Suits.DIAMONDS, Values.three);
    const card3 = new Card(Suits.SPADES, Values.four);
    const card4 = new Card(Suits.DIAMONDS, Values.five);
    const card5 = new Card(Suits.HEARTS, Values.six);
    const testNotHightCard: Hand = Hand.newSpecificHand("player", card1, card2, card3, card4, card5);
    testNotHightCard.printHand();
    expect(testNotHightCard.getRanking()).not.toEqual(Ranking.highCard);
    expect(testNotHightCard.getRanking()).toEqual(Ranking.straight);
    const card6 = new Card(Suits.HEARTS, Values.T);
    const testHightCard: Hand = Hand.newSpecificHand("player", card6, card2, card3, card4, card5);
    expect(testHightCard.getRanking()).toEqual(Ranking.highCard);
    expect(testHightCard.getHandValue()).toBe(Values.T.valueOf());
  });

  
