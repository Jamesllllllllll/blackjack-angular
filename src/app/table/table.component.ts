import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';
import { Card } from '../card/card.component';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  imports: [CommonModule, Card],
})
export class Table {
  drawnCards = this.gameService.drawnCards;
  dealerCards = this.gameService.dealerCards;
  bust = this.gameService.bust;
  gameOver = this.gameService.gameOver;
  win = this.gameService.win;
  cardClasses: string[] = [];
  drawnClasses: string[] = [];

  constructor(private gameService: GameService) {
    this.drawnCards = this.gameService.drawnCards;
    this.dealerCards = this.gameService.dealerCards;
    this.win = this.gameService.win;
    for (let i = 0; i < this.dealerCards.length; i++) {
      this.cardClasses.push('zIndex-' + i);
    }
    for (let i = 0; i < this.drawnCards.length; i++) {
      this.drawnClasses.push('zIndex-' + i);
    }
  }

  hitMe() {
    this.gameService.hitMe();
    this.bust = this.gameService.bust;
    this.gameOver = this.gameService.gameOver;
    this.cardClasses.push('zIndex-' + this.cardClasses.length)
  }

  stand() {
    this.gameService.stand();
    this.win = this.gameService.win;
    this.gameOver = this.gameService.gameOver;
    console.log('table game over:', this.gameOver)
  }

  deal() {
    this.gameService.deal();
    this.drawnCards = this.gameService.drawnCards;
    this.bust = this.gameService.bust;
    this.gameOver = this.gameService.gameOver;
    this.win = this.gameService.win;
    console.log('drawn cards:', this.drawnCards);
  }
}
