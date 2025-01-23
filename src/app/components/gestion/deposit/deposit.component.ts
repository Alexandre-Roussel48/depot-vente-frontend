import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  FormArray,
} from '@angular/forms';
import { DepositService } from '../../../services/gestion/deposit.service';
import { Observable } from 'rxjs';
import { Client } from '../../../models/client';
import { Game } from '../../../models/game';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss',
})
export class DepositComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;
  depositForm: FormGroup;
  depositFormToggle: boolean = false;

  /********************
   * FORMULAIRE CLIENT *
   ********************/

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
    this.depositForm = this.fb.group({
      client_id: ['', [Validators.required]],
      discount: [
        0,
        [Validators.required, Validators.min(0), Validators.max(50)],
      ],
      deposit: this.fb.array([]),
    });
    this.fees$ = this.ds.getFees();
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
          this.depositForm.patchValue({
            client_id: client.id,
          });
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
          this.depositForm.patchValue({
            client_id: client.id,
          });
          this.depositFormToggle = true;
        }
      });
    }
  }

  /*******************
   * FORMULAIRE DEPOT *
   *******************/

  games$!: Observable<Game[]>;
  fees$!: Observable<number>;
  private _query: string = '';

  get query(): string {
    return this._query;
  }

  set query(value: string) {
    this._query = value;
    this.searchGames();
  }

  searchGames() {
    this.games$ = this.ds.getGames(this.query);
  }

  selectedGames: Game[] = [];

  addToSelectedGames(game: Game): void {
    if (!this.selectedGames.some((selected) => selected.id === game.id)) {
      this.selectedGames.push(game);
      this.gamesFormArray.push(
        this.fb.group({
          game_id: [game.id, Validators.required],
          qty: [1, [Validators.required, Validators.min(1)]],
          unit_price: [0, [Validators.required, Validators.min(0)]],
        })
      );
    }
    this.query = '';
  }

  removeGame(index: number): void {
    this.selectedGames.splice(index, 1);
    this.gamesFormArray.removeAt(index);
  }

  get gamesFormArray(): FormArray {
    return this.depositForm.get('deposit') as FormArray;
  }

  onDeposit() {
    if (this.depositForm.valid) {
      const { client_id, discount, deposit } = this.depositForm.value;
      this.ds.deposit(client_id, discount, deposit);
      this.depositFormToggle = false;
      this.loginForm.setValue({
        email: '',
      });
      this.registerForm.setValue({
        name: '',
        surname: '',
        email: '',
        phone_number: '',
        address: '',
      });
    }
  }
}
