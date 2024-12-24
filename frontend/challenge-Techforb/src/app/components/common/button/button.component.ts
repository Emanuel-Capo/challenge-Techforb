import { NgClass } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  size = input.required<'small' | 'large'>();
  color = input.required<'primary' | 'secondary'>();
  children = input.required<string>();
  isLoading = input(false);
  disabled = input(false);
  type = input<'submit' | 'button'>('submit');
  @Input() action: () => void = () => undefined;
}
