import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DepositService } from '../../../services/gestion/deposit.service';
import { Observable } from 'rxjs';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss',
})
export class DepositComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;
  depositFormToggle: boolean = false;

  client$!: Observable<Client>;

  constructor(
    private fb: FormBuilder,
    private ds: DepositService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?:0|\\+33)\\s?(\\d{1}(?:\\s?\\d{2}){4}|\\d{8})$'
          ),
        ],
      ],
      address: ['', []],
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { name, surname, email, phone_number, address } =
        this.registerForm.value;
      this.client$ = this.ds.registerClient(
        name,
        surname,
        email,
        phone_number,
        address
      );
      this.client$.subscribe((client) => {
        if (client) {
          this.depositFormToggle = true;
        }
      });
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email } = this.loginForm.value;
      this.client$ = this.ds.getClientByEmail(email);
      this.client$.subscribe((client) => {
        if (client) {
          this.depositFormToggle = true;
        }
      });
    }
  }
}
