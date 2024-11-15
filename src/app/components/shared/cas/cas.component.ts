import { Component } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './cas.component.html',
  styleUrl: './cas.component.scss',
})
export class CasComponent {
  redirect: string = '/gestion';

  loginForm: FormGroup;

  message$!: Observable<string>;
  message!: string;

  isLogged!: boolean;

  constructor(
    private fb: FormBuilder,
    public as: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['redirect']) {
        this.redirect = params['redirect'];
      }
      if (this.as.isAuthenticated()) {
        this.router.navigate([this.redirect]);
      }
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.message$ = this.as.login(email, password);
      this.message$.subscribe((message) => {
        if (message) {
          this.message = message;
          if (this.as.isAuthenticated()) {
            this.router.navigate([this.redirect]);
          }
        }
      });
    }
  }
}
