import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TransactionService } from '../../../services/gestion/transactions.service';
import { Transaction } from '../../../models/transaction';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatCardModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements AfterViewInit {
  constructor(private transactionService: TransactionService) {}

  displayedColumns: string[] = ['type', 'date', 'value', 'seller_email'];
  dataSource = new MatTableDataSource<Transaction>([]);

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadTransactions(); // Charger les transactions au démarrage
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Assigner MatSort à MatTableDataSource
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: (transactions) => {
        this.dataSource.data = transactions;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des transactions:', err);
      },
    });
  }
}
