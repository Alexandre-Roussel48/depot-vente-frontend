import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { IndexService } from './services/index.service';
import { Session } from './models/session';
import { CatalogItem } from './models/catalog-item';
import { AsyncPipe } from '@angular/common';
import { CatalogItemComponent } from './components/shared/catalog-item/catalog-item.component';

@Component({
  selector: 'app-app',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe, CatalogItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  session$!: Observable<Session>;
  status: string = 'Aucune session actuellement en cours.';

  catalog$!: Observable<CatalogItem[]>;
  catalogToggle: boolean = false;

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
    this.catalogToggle = true;
    this.catalog$ = this.is.getCurrentCatalog();
  }
}
