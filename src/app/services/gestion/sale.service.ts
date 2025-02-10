import { Injectable } from '@angular/core';
import { SaleItem } from '../../models/sale-item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  constructor(private http: HttpClient) {}

  getSaleItems(query: string): Observable<SaleItem[]> {
    return this.http
      .get<
        SaleItem[]
      >(`${environment.baseURL}/gestion/sale/realgames?query=${query}`)
      .pipe(map((data) => data.map((json) => SaleItem.createFrom(json))));
  }

  sell(sell: { id: number }[]) {
    const body = sell;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post(`${environment.baseURL}/gestion/sale/register`, body, {
        headers,
      })
      .subscribe();
  }
}
