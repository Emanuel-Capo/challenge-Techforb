import {
  Component,
  ElementRef,
  input,
  OnInit,
  Renderer2,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../common/button/button.component';
import { PlantData } from '../../../../services/data.service';
import { EditModalComponent } from '../../modal/edit-modal/edit-modal.component';
import {
  DeleteData,
  DeleteModalComponent,
} from '../../modal/delete-modal/delete-modal.component';

@Component({
  selector: '[app-table-row]',
  standalone: true,
  imports: [ButtonComponent, EditModalComponent, DeleteModalComponent],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss',
})
export class TableRowComponent implements OnInit {
  data = input.required<PlantData>();
  toggleButton = viewChild<ElementRef>('toggleButton');
  menu = viewChild<ElementRef>('menu');

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.toggleButton()?.nativeElement &&
        e.target !== this.menu()?.nativeElement
      ) {
        this.isMenuOpen = false;
      }
    });
  }

  deleteData: DeleteData | undefined = undefined;

  ngOnInit(): void {
    this.deleteData = {
      id: this.data().id,
      plant: this.data().plant,
    };
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openModalEdit = false;
  openModalDelete = false;

  handleModalEdit = () => {
    this.openModalEdit = !this.openModalEdit;
  };

  handleModalDelete = () => {
    this.openModalDelete = !this.openModalDelete;
  };
}
