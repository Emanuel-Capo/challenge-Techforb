import { Component, inject, input, Input } from '@angular/core';
import { ButtonComponent } from '../../../common/button/button.component';
import { DataService } from '../../../../services/data.service';
import { ToastrService } from 'ngx-toastr';

export interface DeleteData {
  id: number;
  plant: string;
}

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {
  @Input() closeModal: () => void = () => undefined;
  deleteData = input.required<DeleteData>();
  private _dataService = inject(DataService);
  private readonly _toast = inject(ToastrService);

  isLoading = false;

  handleDelete = () => {
    this.isLoading = true;
    this._dataService
      .DeletePlant(this.deleteData().id)
      .subscribe({
        next: () => {
          this._toast.success('Planta eliminada corréctamente');
          this._dataService.emitChange.emit();
        },
        error: () => {
          this._toast.error('Ha ocurrido un error al eliminar la planta');
        },
      })
      .add(() => {
        this.isLoading = false;
        this.closeModal();
      });
  };
}
