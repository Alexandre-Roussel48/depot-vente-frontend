import { Injectable } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${environment.baseURL}/gestion/transactions`)
      .pipe(
        map((transactions) => {
          return transactions.map((transaction) =>
            Transaction.createFrom(transaction)
          );
        })
      );
  }
}
