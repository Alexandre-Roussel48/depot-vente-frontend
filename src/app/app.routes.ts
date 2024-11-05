import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CasComponent } from './components/shared/cas/cas.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: CasComponent },
  { path: 'gestion', component: GestionComponent, canActivate: [authGuard] },
  //	{path: 'user/:userId', component: UsersDetailsComponent},
  //	{path: 'user/edit/:userId', component: UsersFormComponent},
  { path: '', component: AppComponent },
  //	{path: '**', component: PageNotFoundComponent}
];
