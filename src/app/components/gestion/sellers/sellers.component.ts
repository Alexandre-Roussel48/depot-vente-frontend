import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { map, Observable, startWith } from 'rxjs';
import { Client } from '../../../models/client';
import { ClientDetails } from '../../../models/client-details'; // Import du modèle ClientDetails
import { SellersService } from '../../../services/gestion/sellers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sellers',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
  ],
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss'],
})
export class SellersComponent implements OnInit {
  emailControl = new FormControl();
  filteredOptions!: Observable<Client[]>;
  selectedClient!: Client; // Le client sélectionné
  clientDetails!: ClientDetails; // Détails du client

  constructor(private sellersService: SellersService) {}

  ngOnInit(): void {
    this.filteredOptions = this.emailControl.valueChanges.pipe(
      startWith<string | Client>(''),
      map((value) => (typeof value === 'string' ? value : value.email)),
      map((email) =>
        email ? this._filter(email) : this.sellersService.searchEmails(email)
      )
    );
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onSearch(): void {
    const email = this.clientForm.get('email')!.value;
    if (!email) return;

    // Rechercher le client correspondant par email
    this.sellersService.getClientInfo(email).subscribe((clientDetails) => {
      this.clientDetails = clientDetails;
    });
  }
}
