import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';
import { Card } from '../card/card.component';

@Component({
  selector: 'app-table',
  standalone: true,
  template: `
    <div class="playField">
      <div class="dealerCards">
        <app-card *ngFor="let card of dealerCards" [card]="card"></app-card>
      </div>
      <div class="drawnCards">
        <app-card *ngFor="let card of drawnCards" [card]="card"></app-card>
      </div>
      <div class="actions">
        @if (this.bust) {
        <p class="bust">Bust!</p>
        } @if (!this.gameOver) {
        <button (click)="hitMe()" type="button" class="hitMe">Hit Me!</button>
        <button (click)="stand()" type="button" class="stand">Stand</button>
        } @if (this.gameOver) {
        <button (click)="deal()" type="button" class="resetGame">Deal</button>
        } @if (this.win) {
        <p>You win!</p>
        } @if (!this.win && this.gameOver) {
        <p>You lose!</p>
        }
      </div>
    </div>
  `,
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, Card],
})
export class Table {
  drawnCards = this.gameService.drawnCards;
  dealerCards = this.gameService.dealerCards;
  bust = this.gameService.bust;
  gameOver = this.gameService.gameOver;
  win = false;

  constructor(private gameService: GameService) {
    this.drawnCards = this.gameService.drawnCards;
    this.dealerCards = this.gameService.dealerCards;
    this.win = this.gameService.win;
    console.log(this.gameService.drawnCards);
  }

  hitMe() {
    this.gameService.hitMe();
    this.bust = this.gameService.bust;
    this.gameOver = this.gameService.gameOver;
  }

  stand() {
    this.gameService.stand();
    this.gameOver = this.gameService.gameOver;
    this.win = this.gameService.win;
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
