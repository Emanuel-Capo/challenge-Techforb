import { Component, inject, OnInit } from '@angular/core';
import {
  CardComponent,
  CardData,
} from '../../components/dashboard/card/card.component';
import { TableComponent } from '../../components/dashboard/table/table.component';
import { SidebarComponent } from '../../components/dashboard/sidebar/sidebar.component';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, TableComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly _cookies = inject(CookieService);
  private readonly _dataService = inject(DataService);
  private readonly _toast = inject(ToastrService);
  userName = '';
  total: number[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.userName = this._cookies.get('fullname');
    this.LoadInfo();
    this._dataService.emitChange.subscribe(() => this.LoadInfo());
  }

  LoadInfo = () => {
    this.isLoading = true;
    this._dataService
      .GetTotals()
      .subscribe({
        next: data => {
          const newTotal = [];
          newTotal.push(data.readings);
          newTotal.push(data.midAlerts);
          newTotal.push(data.redAlerts);
          newTotal.push(data.disabled);
          this.total = newTotal;
        },
        error: () =>
          this._toast.error('Ha ocurrido un error al cargar los datos'),
      })
      .add(() => {
        this.isLoading = false;
      });
  };

  dataCardMain: CardData[] = [
    {
      title: 'Lecturas Ok',
      mainIcon: '/assets/icons/checkIconMain.svg',
      size: 'large',
    },
    {
      title: 'Alertas medias',
      mainIcon: '/assets/icons/midIconMain.svg',
      size: 'large',
    },
    {
      title: 'Alertas rojas',
      mainIcon: '/assets/icons/redIconMain.svg',
      size: 'large',
    },
    {
      title: 'Sensores deshabilitados',
      mainIcon: '/assets/icons/disabledIconMain.svg',
      size: 'large',
    },
  ];

  dataCardInfo: CardData[] = [
    {
      title: 'Temperatura',
      mainIcon: '/assets/icons/temperatureIcon.svg',
      size: 'small',
      info: {
        ok: Math.floor(Math.random() * 200),
        mid: Math.floor(Math.random() * 200),
        red: Math.floor(Math.random() * 200),
      },
    },
    {
      title: 'Presion',
      mainIcon: '/assets/icons/presureIcon.svg',
      size: 'small',
      info: {
        ok: Math.floor(Math.random() * 200),
        mid: Math.floor(Math.random() * 200),
        red: Math.floor(Math.random() * 200),
      },
    },
    {
      title: 'Viento',
      mainIcon: '/assets/icons/windIcon.svg',
      size: 'small',
      info: {
        ok: Math.floor(Math.random() * 200),
        mid: Math.floor(Math.random() * 200),
        red: Math.floor(Math.random() * 200),
      },
    },
    {
      title: 'Niveles',
      mainIcon: '/assets/icons/levelIcon.svg',
      size: 'small',
      info: {
        ok: Math.floor(Math.random() * 200),
        mid: Math.floor(Math.random() * 200),
        red: Math.floor(Math.random() * 200),
      },
    },
    {
      title: 'Energía',
      mainIcon: '/assets/icons/energyIcon.svg',
      size: 'small',
      info: {
        ok: Math.floor(Math.random() * 200),
        mid: Math.floor(Math.random() * 200),
        red: Math.floor(Math.random() * 200),
      },
    },
    {
      title: 'Tensión',
      mainIcon: '/assets/icons/tensionIcon.svg',
      size: 'small',
      info: {
        ok: Math.floor(Math.random() * 200),
        mid: Math.floor(Math.random() * 200),
        red: Math.floor(Math.random() * 200),
      },
    },
    {
      title: 'Monóxido de carbono',
      mainIcon: '/assets/icons/COIcon.svg',
      size: 'small',
      info: {
        ok: Math.floor(Math.random() * 200),
        mid: Math.floor(Math.random() * 200),
        red: Math.floor(Math.random() * 200),
      },
    },
    {
      title: 'Otros gases',
      mainIcon: '/assets/icons/gasIcon.svg',
      size: 'small',
      info: {
        ok: Math.floor(Math.random() * 200),
        mid: Math.floor(Math.random() * 200),
        red: Math.floor(Math.random() * 200),
      },
    },
  ];
}
