import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';
import { Card } from '../card/card.component';

@Component({
  selector: 'app-table',
  standalone: true,
  template: `
    <div class="drawnCards">
      <app-card *ngFor="let card of drawnCards" [card]="card"></app-card>
    </div>
    <div class="actions">
      @if (this.bust) {
      <p class="bust">Bust!</p>
      <button (click)="deal()" type="button" class="resetGame">Deal</button>
      } @else {
      <button (click)="hitMe()" type="button" class="hitMe">Hit Me!</button>
      <button type="button" class="stand">Stand</button>
      }
    </div>
  `,
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, Card],
})
export class Table {
  drawnCards = this.gameService.drawnCards;
  bust = this.gameService.bust;

  constructor(private gameService: GameService) {
    this.drawnCards = this.gameService.drawnCards;
    console.log(this.gameService.drawnCards);
  }

  hitMe() {
    this.gameService.hitMe();
    this.bust = this.gameService.bust;
  }

  deal() {
    this.gameService.deal();
    this.drawnCards = this.gameService.drawnCards;
    this.bust = this.gameService.bust;
    console.log('drawn cards:', this.drawnCards);
  }
}
