import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GestionComponent } from './components/gestion/gestion.component';

export const routes: Routes = [
  { path: 'gestion', component: GestionComponent },
  //	{path: 'user/:userId', component: UsersDetailsComponent},
  //	{path: 'user/edit/:userId', component: UsersFormComponent},
  { path: '', component: AppComponent },
  //	{path: '**', component: PageNotFoundComponent}
];
