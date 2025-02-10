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
import { SaleService } from '../../../services/gestion/sale.service';
import { Observable } from 'rxjs';
import { SaleItem } from '../../../models/sale-item';

@Component({
  selector: 'app-sale',
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
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss',
})
export class SaleComponent {
  saleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ss: SaleService
  ) {
    this.saleForm = this.fb.group({
      sale: this.fb.array([]),
    });
  }

  /*******************
   * FORMULAIRE VENTE *
   *******************/

  games$!: Observable<SaleItem[]>;
  private _query: string = '';

  get query(): string {
    return this._query;
  }

  set query(value: string) {
    this._query = value;
    this.searchSaleItems();
  }

  searchSaleItems() {
    this.games$ = this.ss.getSaleItems(this.query);
  }

  selectedGames: SaleItem[] = [];

  addToSelectedGames(game: SaleItem): void {
    if (!this.selectedGames.some((selected) => selected.id === game.id)) {
      this.selectedGames.push(game);
      this.gamesFormArray.push(this.fb.control(game.id, Validators.required));
    }
    this.query = '';
  }

  removeGame(index: number): void {
    this.selectedGames.splice(index, 1);
    this.gamesFormArray.removeAt(index);
  }

  get gamesFormArray(): FormArray {
    return this.saleForm.get('sale') as FormArray;
  }

  getTotalPrice(): number {
    return this.selectedGames.reduce(
      (total, game) => total + Number(game.unit_price),
      0
    );
  }

  onSell() {
    if (this.saleForm.valid) {
      const { sale } = this.saleForm.value;
      this.ss.sell(sale);
    }
  }
}
