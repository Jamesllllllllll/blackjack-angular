import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { SingleCard } from '../singleCard';
@Component({
  selector: 'app-card',
  template: '<canvas #canvas width="150" height="200"></canvas>',
  standalone: true,
  imports: [],
  styleUrl: './card.component.css'
})
export class Card implements OnInit {
  @Input() card!: SingleCard;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
    const context = this.canvasRef.nativeElement.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context');
    }
    this.ctx = context;
    this.drawCard();
  }

  drawCard() {
    const ctx = this.ctx;
    const canvas = this.canvasRef.nativeElement;
    const cornerRadius = 10;

    // Draw card outline and border
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.moveTo(cornerRadius, 0);
    ctx.lineTo(canvas.width - cornerRadius, 0);
    ctx.arc(canvas.width - cornerRadius, cornerRadius, cornerRadius, 1.5 * Math.PI, 2 * Math.PI);
    ctx.lineTo(canvas.width, canvas.height - cornerRadius);
    ctx.arc(canvas.width - cornerRadius, canvas.height - cornerRadius, cornerRadius, 0, 0.5 * Math.PI);
    ctx.lineTo(cornerRadius, canvas.height);
    ctx.arc(cornerRadius, canvas.height - cornerRadius, cornerRadius, 0.5 * Math.PI, Math.PI);
    ctx.lineTo(0, cornerRadius);
    ctx.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw suit symbol
    ctx.font = '80px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText(this.card.suit, canvas.width / 2, canvas.height / 2 + 20);

    // Draw card value
    ctx.font = '40px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(this.card.rank, canvas.width / 4.75, canvas.height / 4);
  }
}