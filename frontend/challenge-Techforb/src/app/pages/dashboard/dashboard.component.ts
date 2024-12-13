import { Component } from '@angular/core';
import {
  CardComponent,
  CardData,
} from '../../components/dashboard/card/card.component';
import { TableComponent } from "../../components/dashboard/table/table.component";
import { SidebarComponent } from "../../components/dashboard/sidebar/sidebar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, TableComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  dataCardMain: CardData[] = [
    {
      title: 'Lecturas Ok',
      mainIcon: '/assets/icons/checkIconMain.svg',
      size: 'large',
      value: 1234,
    },
    {
      title: 'Alertas medias',
      mainIcon: '/assets/icons/midIconMain.svg',
      size: 'large',
      value: 1234,
    },
    {
      title: 'Alertas rojas',
      mainIcon: '/assets/icons/redIconMain.svg',
      size: 'large',
      value: 1234,
    },
    {
      title: 'Sensores deshabilitados',
      mainIcon: '/assets/icons/disabledIconMain.svg',
      size: 'large',
      value: 1234,
    },
  ];

  dataCardInfo: CardData[] = [
    {
      title: 'Temperatura',
      mainIcon: '/assets/icons/temperatureIcon.svg',
      size: 'small',
      info:{
        ok:123,
        mid:456,
        red:789
      }
    },
    {
      title: 'Presion',
      mainIcon: '/assets/icons/presureIcon.svg',
      size: 'small',
      info:{
        ok:123,
        mid:456,
        red:789
      }
    },
    {
      title: 'Viento',
      mainIcon: '/assets/icons/windIcon.svg',
      size: 'small',
      info:{
        ok:123,
        mid:456,
        red:789
      }
    },
    {
      title: 'Niveles',
      mainIcon: '/assets/icons/levelIcon.svg',
      size: 'small',
      info:{
        ok:123,
        mid:456,
        red:789
      }
    },
    {
      title: 'Energía',
      mainIcon: '/assets/icons/energyIcon.svg',
      size: 'small',
      info:{
        ok:123,
        mid:456,
        red:789
      }
    },
    {
      title: 'Tensión',
      mainIcon: '/assets/icons/tensionIcon.svg',
      size: 'small',
      info:{
        ok:123,
        mid:456,
        red:789
      }
    },
    {
      title: 'Monóxido de carbono',
      mainIcon: '/assets/icons/COIcon.svg',
      size: 'small',
      info:{
        ok:123,
        mid:456,
        red:789
      }
    },
    {
      title: 'Otros gases',
      mainIcon: '/assets/icons/gasIcon.svg',
      size: 'small',
      info:{
        ok:123,
        mid:456,
        red:789
      }
    },
  ];
}
