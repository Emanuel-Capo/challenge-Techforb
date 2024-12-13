import { Component, input } from '@angular/core';

export interface CardData {
  title: string
  mainIcon: string
  size: 'small' | 'large'
  value?: number
  info?: values
}

interface values {
  ok: number
  mid: number
  red: number
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  data = input<CardData>(
    {
      title: '',
      mainIcon: '',
      size: 'large',
    }
  )
}
