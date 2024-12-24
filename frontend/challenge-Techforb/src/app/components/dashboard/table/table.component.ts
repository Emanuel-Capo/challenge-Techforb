import { Component, inject, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { forwardRef } from '@angular/core';
import { TableRowComponent } from './table-row/table-row.component';
import { DataService, PlantData } from '../../../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ModalComponent, forwardRef(() => TableRowComponent)],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  private _dataService = inject(DataService);
  private readonly _toast = inject(ToastrService);

  plantsData: PlantData[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.LoadInfo();
    this._dataService.emitChange.subscribe(() => this.LoadInfo());
  }

  LoadInfo = () => {
    this.isLoading = true;
    this._dataService
      .GetPlants()
      .subscribe({
        next: data => {
          this.plantsData = data;
        },
        error: () =>
          this._toast.error('Ha ocurrido un error al cargar los datos'),
      })
      .add(() => {
        this.isLoading = false;
      });
  };

  openModal = false;
  tableActions = true;

  handleOpenModal = () => {
    this.openModal = true;
  };

  handleCloseModal = () => {
    this.openModal = false;
  };
}
