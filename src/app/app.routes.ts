import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CasComponent } from './components/shared/cas/cas.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { SaleComponent } from './components/gestion/sale/sale.component';
import { DepositComponent } from './components/gestion/deposit/deposit.component';
import { BalanceComponent } from './components/gestion/balance/balance.component';
import { SellersComponent } from './components/gestion/sellers/sellers.component';
import { StocksComponent } from './components/gestion/stocks/stocks.component';
import { TransactionsComponent } from './components/gestion/transactions/transactions.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: CasComponent },
  {
    path: 'gestion',
    component: GestionComponent,
    canActivate: [authGuard],
    children: [
      { path: 'sell', component: SaleComponent },
      { path: 'deposit', component: DepositComponent },
      { path: 'balance', component: BalanceComponent },
      { path: 'sellers', component: SellersComponent },
      { path: 'stocks', component: StocksComponent },
      { path: 'transactions', component: TransactionsComponent },
    ],
  },
  { path: '', component: AppComponent },
  //	{path: '**', component: PageNotFoundComponent}
];
