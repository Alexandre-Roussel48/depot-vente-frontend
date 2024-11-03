import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.scss',
})
export class GestionComponent {
  isAuthenticated: boolean = false;

  constructor(public as: AuthService) {}

  ngOnInit() {}

  updateAuth(value: boolean) {
    this.isAuthenticated = value;
  }
}
