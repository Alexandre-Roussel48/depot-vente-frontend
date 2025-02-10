import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  items = [
    {
      title: 'Jeux',
      route: '/admin/game',
    },
    {
      title: 'Utilisateurs',
      route: '/admin/user',
    },
    {
      title: 'Configurations',
      route: '/admin/config',
    },
    {
      title: 'Sessions',
      route: '/admin/session',
    },
  ];

  activeLink = this.items[0].route;
}
