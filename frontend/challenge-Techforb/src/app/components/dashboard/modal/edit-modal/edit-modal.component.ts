import { Component, inject, input, Input, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DataService,
  EditData,
  PlantData,
} from '../../../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../../common/button/button.component';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
})
export class EditModalComponent implements OnInit {
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  @Input() closeModal: () => void = () => undefined;
  editData = input.required<PlantData>();
  private _dataService = inject(DataService);
  private readonly _toast = inject(ToastrService);

  ngOnInit(): void {
    this.editFormgroup.setValue({
      readings: this.editData().readings,
      midAlerts: this.editData().midAlerts,
      redAlerts: this.editData().redAlerts,
      disabled: this.editData().disabled,
    });
  }

  isLoading = false;

  editFormgroup = this._formBuilder.group({
    readings: [0, Validators.min(0)],
    midAlerts: [0, Validators.min(0)],
    redAlerts: [0, Validators.min(0)],
    disabled: [0, Validators.min(0)],
  });

  handleEdit = () => {
    this.isLoading = true;
    const { readings, midAlerts, redAlerts, disabled } =
      this.editFormgroup.getRawValue();
    const data: EditData = {
      id: this.editData().id,
      readings: readings,
      midAlerts: midAlerts,
      redAlerts: redAlerts,
      disabled: disabled,
    };
    this._dataService
      .EditPlant(data)
      .subscribe({
        next: () => {
          this._toast.success('Planta editada corréctamente');
          this._dataService.emitChange.emit();
        },
        error: () => {
          this._toast.error('Ha ocurrido un error al editar');
        },
      })
      .add(() => {
        this.isLoading = false;
        this.closeModal();
      });
  };
}
