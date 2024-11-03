import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IndexService } from './services/index.service';
import { Session } from './models/session';
import { CatalogItem } from './models/catalog-item';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CatalogComponent } from './components/shared/catalog/catalog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    CatalogComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSliderModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  session$!: Observable<Session>;
  status: string = 'Aucune session actuellement en cours.';

  catalog$!: Observable<CatalogItem[]>;
  catalogToggle: boolean = false;

  isSidebarOpen: boolean = false;

  constructor(public is: IndexService) {}

  ngOnInit() {
    this.session$ = this.is.getCurrentSession();
    this.session$.subscribe((session) => {
      if (session) {
        this.status = 'Une session est actuellement en cours.';
      }
    });
  }

  toggleCatalog() {
    this.catalog$ = this.is.getCurrentCatalog();
    this.catalogToggle = true;
  }

  /*=========*/
  /* FILTERS */
  /*=========*/

  toggleSidebar() {
    this.isSidebarOpen = this.isSidebarOpen ? false : true;
  }

  private _query: string = '';
  private range: string = '0-50';

  startValue: number = 0;
  endValue: number = 50;

  get query(): string {
    return this._query;
  }

  set query(value: string) {
    this._query = value;
    this.searchCatalog();
  }

  applyFilters() {
    this.isSidebarOpen = false;
    this.range = `${this.startValue}-${this.endValue}`;
    this.searchCatalog();
  }

  searchCatalog() {
    this.catalog$ = this.is.getCurrentCatalog(this.query, this.range);
  }
}
