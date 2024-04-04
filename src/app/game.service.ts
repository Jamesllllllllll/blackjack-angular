import { Injectable } from '@angular/core';
import { SingleCard } from './singleCard';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  deck: SingleCard[] = [];
  bust: boolean = false;
  drawnCards: SingleCard[] = [];

  constructor() {
    this.deck = this.buildDeck();
    this.drawnCards = this.drawCards();
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
    // TODO: Implement logic for selecting an available card in the deck
    if (this.deck.length < 2) {
      throw new Error('Not enough cards in the deck');
    }

    const cards: SingleCard[] = [];

    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * this.deck.length);
      const drawnCard = this.deck.splice(randomIndex, 1)[0];
      cards.push(drawnCard);
    }
    console.log(`remaining cards in the deck: ${this.deck.length}`);
    return cards;
  }

  hitMe(): SingleCard {
    if (this.deck.length < 1) {
      throw new Error('Not enough cards in the deck');
    }

    const drawnCard = this.drawCardFromDeck();
    this.drawnCards.push(drawnCard);
    // check if hand is a bust
    const handValue = this.calculateHandValue();
    if (handValue > 21) {
      console.log('bust!');
      this.bust = true;
    }
    return drawnCard;
  }

  deal(): void {
    console.log('dealing...');
    this.deck = this.buildDeck();
    this.drawnCards = this.drawCards();
    this.bust = false;
  }

  private drawCardFromDeck(): SingleCard {
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    const drawnCard = this.deck.splice(randomIndex, 1)[0];
    console.log('drawing', drawnCard);
    return drawnCard;
  }

  private calculateHandValue(): number {
    // This doesn't account for aces being 1 or 11
    // const handValue = this.drawnCards.reduce((acc, cur) => {
    //   const rankValue = isNaN(parseInt(cur.rank)) ? 10 : parseInt(cur.rank);
    //   return acc + rankValue;
    // }, 0);
    let handValue = 0;
    let aces = 0;

    for (let i = 0; i < this.drawnCards.length; i++) {
      let currentCard = this.drawnCards[i].rank;
      if (currentCard === 'A') {
        aces++
      } else {
        handValue += isNaN(parseInt(this.drawnCards[i].rank)) ? 10 : parseInt(this.drawnCards[i].rank)
      }
    }

    // iterate through aces
    for (let j = aces; j > 0; j--) {
      if (handValue > (11-j)) {
        handValue += 1;
      } else {
        handValue += 11;
      }
    }

    console.log(`handValue: ${handValue}`);
    return handValue;
  }
}
