import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
//import { UsersListComponent } from './components/user/users-list/users-list.component';
//import { UsersDetailsComponent } from './components/user/users-details/users-details.component';
//import { UsersFormComponent } from './components/user/users-form/users-form.component';
//import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

export const routes: Routes = [
  //	{path: 'users', component: UsersListComponent},
  //	{path: 'user/:userId', component: UsersDetailsComponent},
  //	{path: 'user/edit/:userId', component: UsersFormComponent},
  { path: '', component: AppComponent },
  //	{path: '**', component: PageNotFoundComponent}
];
