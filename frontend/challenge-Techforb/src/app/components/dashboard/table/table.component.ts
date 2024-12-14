import { Component, signal } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  openModal = signal(false);

  handleModal = () => {
    this.openModal.set(true);
  };
}
