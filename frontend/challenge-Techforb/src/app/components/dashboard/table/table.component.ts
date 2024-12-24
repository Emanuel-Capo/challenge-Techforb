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
  currentPage = 0;
  pages = 1;
  firstPage = true;
  lastPage = true;

  ngOnInit(): void {
    this.LoadInfoPages(0);
    this._dataService.emitChange.subscribe(() => {
      this.LoadInfoPages(0);
      this.currentPage = 0;
    });
  }

  LoadInfoPages = (page: number) => {
    this.isLoading = true;
    this._dataService
      .GetAllWithPages(page)
      .subscribe({
        next: data => {
          this.plantsData = data.content;
          this.firstPage = data.first;
          this.lastPage = data.last;
          this.pages = data.totalPages;
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

  nextPage = () => {
    this.currentPage++;
    this.LoadInfoPages(this.currentPage);
  };

  previousPage = () => {
    this.currentPage--;
    this.LoadInfoPages(this.currentPage);
  };
}
