import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private http: HttpClient) {}

  getTotal(): Observable<number> {
    return this.http
      .get<{ treasury: number }>(`${environment.baseURL}/gestion/treasury`)
      .pipe(map((response) => response.treasury));
  }

  getTotalDue(): Observable<number> {
    return this.http
      .get<{ due: number }>(`${environment.baseURL}/gestion/balance/due`)
      .pipe(map((response) => response.due));
  }

  getTotalDepositFees(): Observable<number> {
    return this.http
      .get<{ totalFees: number }>(`${environment.baseURL}/gestion/fees`)
      .pipe(map((response) => response.totalFees));
  }

  getTotalCommissions(): Observable<number> {
    return this.http
      .get<{
        totalCommission: number;
      }>(`${environment.baseURL}/gestion/commissions`)
      .pipe(map((response) => response.totalCommission));
  }
}
