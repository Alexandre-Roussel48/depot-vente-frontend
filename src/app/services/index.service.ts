import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Session } from '../models/session';
import { CatalogItem } from '../models/catalog-item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  private http: HttpClient;

  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  getCurrentSession(): Observable<Session> {
    return this.http
      .get<Session>(`${environment.baseURL}/session`)
      .pipe(map((json) => Session.createFrom(json)));
  }

  getCurrentCatalog(
    query: string = '',
    range: string = ''
  ): Observable<CatalogItem[]> {
    return this.http
      .get<
        CatalogItem[]
      >(`${environment.baseURL}/catalog?range=${range}&query=${query}`)
      .pipe(map((data) => data.map((json) => CatalogItem.createFrom(json))));
  }
}
