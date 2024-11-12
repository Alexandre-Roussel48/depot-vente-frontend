import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [MatCardModule, MatIconModule, RouterOutlet, MatTabsModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.scss',
})
export class GestionComponent {
  constructor(public router: Router) {
    this.router.navigate([this.items[0].route]);
  }

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

  navigateToTab(index: number): void {
    this.router.navigate([this.items[index].route]);
  }
}
