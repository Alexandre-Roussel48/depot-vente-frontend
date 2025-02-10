import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BalanceService } from '../../../services/gestion/balance.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [MatCardModule, AsyncPipe],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent {
  total$!: Observable<number>;
  due$!: Observable<number>;
  fee$!: Observable<number>;
  commission$!: Observable<number>;

  constructor(private bs: BalanceService) {
    this.total$ = this.bs.getTotal();
    this.due$ = this.bs.getTotalDue();
    this.fee$ = this.bs.getTotalDepositFees();
    this.commission$ = this.bs.getTotalCommissions();
  }
}
