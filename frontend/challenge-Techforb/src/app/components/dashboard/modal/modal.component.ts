import { Component, input, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  handleModal = input<WritableSignal<boolean>>();

  type = input<'edit' | 'create'>('create');
}
