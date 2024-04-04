import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from './card/card.component';
import { Table } from './table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Card, Table],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blackjack-game';
}
