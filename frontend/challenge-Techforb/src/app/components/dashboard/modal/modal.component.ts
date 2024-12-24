import { Component, inject, Input, input, OnInit } from '@angular/core';
import { ButtonComponent } from '../../common/button/button.component';
import {
  CreateData,
  DataService,
  PlantData,
} from '../../../services/data.service';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  @Input() closeModal: () => void = () => undefined;
  editData = input<PlantData>();
  private _dataService = inject(DataService);
  private readonly _toast = inject(ToastrService);

  countryName: string[] = [];
  countryCode: string[] = [];

  ngOnInit(): void {
    this._dataService.GetFlags().subscribe(f => {
      for (const [key, value] of Object.entries(f)) {
        this.countryName.push(value);
        this.countryCode.push(key);
      }
    });
  }

  isLoading = false;

  createFormgroup = this._formBuilder.group({
    plant: ['', [Validators.required, Validators.min(3)]],
    country: [[Validators.required]],
  });

  handleCreate = () => {
    this.isLoading = true;
    const { plant, country } = this.createFormgroup.getRawValue();
    const data: CreateData = {
      country: this.countryName[country],
      countryCode: this.countryCode[country],
      plant: plant,
    };
    this._dataService
      .CreatePlant(data)
      .subscribe({
        next: () => {
          this._toast.success('Planta creada corréctamente');
          this._dataService.emitChange.emit();
        },
        error: () => {
          this._toast.error('Ha ocurrido un error al crear la planta');
        },
      })
      .add(() => {
        this.isLoading = false;
        this.closeModal();
      });
  };
}
