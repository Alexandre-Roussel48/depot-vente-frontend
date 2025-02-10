import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { CasComponent } from './components/shared/cas/cas.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

import { GestionComponent } from './components/gestion/gestion.component';
import { SaleComponent } from './components/gestion/sale/sale.component';
import { DepositComponent } from './components/gestion/deposit/deposit.component';
import { BalanceComponent } from './components/gestion/balance/balance.component';
import { SellersComponent } from './components/gestion/sellers/sellers.component';
import { StocksComponent } from './components/gestion/stocks/stocks.component';
import { TransactionsComponent } from './components/gestion/transactions/transactions.component';

import { AdminComponent } from './components/admin/admin.component';

import { authGuard } from './guards/auth.guard';
import { GamesComponent } from './components/admin/games/games.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ConfigComponent } from './components/admin/config/config.component';
import { SessionsComponent } from './components/admin/sessions/sessions.component';

export const routes: Routes = [
  { path: 'login', component: CasComponent },
  {
    path: 'gestion',
    component: GestionComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'sell', pathMatch: 'full' },
      { path: 'sell', component: SaleComponent },
      { path: 'deposit', component: DepositComponent },
      { path: 'balance', component: BalanceComponent },
      { path: 'sellers', component: SellersComponent },
      { path: 'stocks', component: StocksComponent },
      { path: 'transactions', component: TransactionsComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'game', pathMatch: 'full' },
      { path: 'game', component: GamesComponent },
      { path: 'user', component: UsersComponent },
      { path: 'config', component: ConfigComponent },
      { path: 'session', component: SessionsComponent },
    ],
  },
  { path: '', component: AppComponent },
  { path: '**', component: PageNotFoundComponent },
];
