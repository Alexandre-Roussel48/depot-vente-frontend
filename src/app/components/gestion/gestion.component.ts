import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.scss',
})
export class GestionComponent {
  constructor() {}

  items = [
    {
      icon: 'shopping_cart',
      title: 'Vendre',
      description: 'Enregistre une vente dans le système.',
      route: '/gestion/sell',
    },
    {
      icon: 'inventory_2',
      title: 'Déposer',
      description: 'Enregistrer un dépôt dans le système.',
      route: '/gestion/deposit',
    },
    {
      icon: 'attach_money',
      title: 'Bilans',
      description: 'Outil de consultation des bilans généraux.',
      route: '/gestion/balance',
    },
    {
      icon: 'info',
      title: 'Infos vendeurs',
      description:
        'Outil de consultation des informations individuelles des vendeurs.',
      route: '/gestion/infos',
    },
    {
      icon: 'layers',
      title: 'Stocks',
      description: 'Outil de consultation des stocks.',
      route: '/gestion/stocks',
    },
    {
      icon: 'list',
      title: 'Transactions',
      description: 'Outil de consultation des transactions.',
      route: '/gestion/transactions',
    },
  ];
}
