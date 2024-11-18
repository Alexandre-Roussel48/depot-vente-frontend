import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule, RouterLink],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.scss',
})
export class GestionComponent {
  items = [
    {
      title: 'Vendre',
      route: '/gestion/sell',
    },
    {
      title: 'Déposer',
      route: '/gestion/deposit',
    },
    {
      title: 'Bilans',
      route: '/gestion/balance',
    },
    {
      title: 'Infos vendeurs',
      route: '/gestion/sellers',
    },
    {
      title: 'Stocks',
      route: '/gestion/stocks',
    },
    {
      title: 'Transactions',
      route: '/gestion/transactions',
    },
  ];

  activeLink = this.items[0].route;
}
