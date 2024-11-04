import { Component, EventEmitter, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  login$!: Observable<{ isAuthenticated: boolean; message: string }>;
  isLogged$!: Observable<boolean>;
  message!: string;
  @Output() authEmitter = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    public as: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.isLogged$ = this.as.isUserAuthenticated();
    this.isLogged$.subscribe((isLogged) => {
      if (isLogged) {
        this.authEmitter.emit(isLogged);
      }
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.login$ = this.as.login(email, password);
      this.login$.subscribe((login) => {
        if (login) {
          this.message = login.message;
          this.authEmitter.emit(login.isAuthenticated);
        }
      });
    }
  }
}
