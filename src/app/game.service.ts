import { Injectable } from '@angular/core';
import { SingleCard } from './singleCard';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  deck: SingleCard[] = [];
  bust: boolean = false;
  drawnCards: SingleCard[] = [];
  dealerCards: SingleCard[] = [];
  gameOver: boolean = false;
  win: boolean = false;

  constructor() {
    this.deck = this.buildDeck();
    this.drawnCards = this.drawCards();
    this.dealerCards = this.drawCards();
  }

  buildDeck(): SingleCard[] {
    const suits = ['♥', '♦️', '♣️', '♠️'];
    const ranks = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A',
    ];

    const deck: SingleCard[] = [];
    let id = 1;

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        const card: SingleCard = {
          id: id++,
          suit: suit,
          rank: rank,
        };
        deck.push(card);
      });
    });
    return deck;
  }

  shuffleDeck(): SingleCard[] {
    // TODO: Implement logic for shuffling the deck
    return [];
  }

  drawCards(): SingleCard[] {
    if (this.deck.length < 2) {
      throw new Error('Not enough cards in the deck');
    }

    const cards: SingleCard[] = [];

    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * this.deck.length);
      const drawnCard = this.deck.splice(randomIndex, 1)[0];
      cards.push(drawnCard);
    }
    return cards;
  }

  hitMe(): SingleCard {
    if (this.deck.length < 1) {
      throw new Error('Not enough cards in the deck');
    }

    const drawnCard = this.drawCardFromDeck();
    this.drawnCards.push(drawnCard);
    // check if hand is a bust
    const handValue = this.calculateHandValue(this.drawnCards);
    if (handValue > 21) {
      console.log('bust!');
      this.bust = true;
      this.gameOver = true;
    }
    return drawnCard;
  }

  dealerHit() {
    if (this.deck.length < 1) {
      throw new Error('Not enough cards in the deck');
    }

    const drawnCard = this.drawCardFromDeck();
    this.dealerCards.push(drawnCard);
  }

  stand(): void {
    const playerHandValue = this.calculateHandValue(this.drawnCards);
    let dealerHandValue = this.calculateHandValue(this.dealerCards);
    while (dealerHandValue < 17) {
      this.dealerHit();
      dealerHandValue = this.calculateHandValue(this.dealerCards)
    }
    if (playerHandValue > dealerHandValue || dealerHandValue > 21) {
      console.log('Win - dealer hand value:', dealerHandValue)
      console.log('You win!');
      this.win = true;
    } else {
      console.log('Lose - dealer hand value:', dealerHandValue)
      console.log('You lose!');
    }
    console.log('Your hand value: ', playerHandValue)
    this.gameOver = true;
  }

  deal(): void {
    console.log('dealing...');
    // TODO: Currently, each hand is dealt from a fresh deck.
    // In the future, this needs to be refactored if the deck state
    // needs to persist over multiple hands/rounds
    this.deck = this.buildDeck();
    this.drawnCards = this.drawCards();
    this.dealerCards = this.drawCards();
    this.bust = false;
    this.gameOver = false;
    this.win = false;
  }

  private drawCardFromDeck(): SingleCard {
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    const drawnCard = this.deck.splice(randomIndex, 1)[0];
    console.log('drawing', drawnCard);
    return drawnCard;
  }

  private calculateHandValue(hand: SingleCard[]): number {
    // This doesn't account for aces being 1 or 11
    // ... all face cards including aces are worth 10.
    // const handValue = this.drawnCards.reduce((acc, cur) => {
    //   const rankValue = isNaN(parseInt(cur.rank)) ? 10 : parseInt(cur.rank);
    //   return acc + rankValue;
    // }, 0);

    let handValue = 0;
    let aces = 0;

    for (let i = 0; i < hand.length; i++) {
      let currentCard = hand[i].rank;
      if (currentCard === 'A') {
        aces++;
      } else {
        handValue += isNaN(parseInt(hand[i].rank))
          ? 10
          : parseInt(hand[i].rank);
      }
    }

    // iterate through aces
    for (let j = aces; j > 0; j--) {
      if (handValue > 11 - j) {
        handValue += 1;
      } else {
        handValue += 11;
      }
    }

    return handValue;
  }
}
