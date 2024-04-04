import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';
import { Card } from '../card/card.component';
import { SingleCard } from '../singleCard';

@Component({
  selector: 'app-table',
  standalone: true,
  template: `
    <div class="drawnCards">
      <app-card *ngFor="let card of drawnCards" [card]="card"></app-card>
    </div>
    <div class="actions">
      <button (click)="hitMe()" type="button" class="hitMe">Hit Me!</button>
      <button type="button" class="stand">Stand</button>
    </div>
  `,
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, Card],
})
export class Table {
  drawnCards: SingleCard[] = [];

  constructor(private gameService: GameService) {
    this.drawnCards = this.gameService.drawCards();
    console.log(this.drawnCards);
  }

  hitMe() {
    const newCard = this.gameService.hitMe();
    this.drawnCards.push(newCard)
  }
}
