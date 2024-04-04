import { Injectable } from '@angular/core';
import { SingleCard } from './singleCard';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  deck: SingleCard[] = [];

  constructor() {
    this.deck = this.buildDeck();
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
    console.log(`remaining cards in the deck: ${this.deck.length}`)
    return cards;
  }

  hitMe(): SingleCard {
    if (this.deck.length <1) {
      throw new Error('Not enough cards in the deck')
    }
    console.log('hit me!')
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    const drawnCard = this.deck.splice(randomIndex, 1)[0];
    return drawnCard
  }
}
