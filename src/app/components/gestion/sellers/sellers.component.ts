import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { Client } from '../../../models/client';
import { ClientDetails } from '../../../models/client-details'; // Import du modèle ClientDetails
import { SellersService } from '../../../services/gestion/sellers.service';
import { CommonModule } from '@angular/common';
import { Session } from '../../../models/session';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sellers',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss'],
})
export class SellersComponent implements OnInit {
  emailControl = new FormControl<string | Client>('');
  sessionControl = new FormControl<Session | null>(null, Validators.required);
  filteredOptions!: Observable<Client[]>;
  selectedClient!: Client;
  selectedSession!: Session;
  clientDetails?: ClientDetails;

  sessions: Session[] = [];
  constructor(private sellersService: SellersService) {}

  ngOnInit(): void {
    this.filteredOptions = this.emailControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.email)),
      switchMap((email) =>
        email ? this._filter(email) : this.sellersService.searchEmails('')
      )
    );

    this.sellersService.getAllSession().subscribe((sessions) => {
      this.sessions = sessions;
    });
  }

  private _filter(email: string): Observable<Client[]> {
    return this.sellersService.searchEmails(email);
  }
  onSearch(): void {
    const email = this.emailControl.value;
    if (!email || typeof email !== 'string') return;

    // Rechercher le client correspondant par email
    this.sellersService.searchEmails(email).subscribe((clients) => {
      if (clients.length > 0) {
        this.selectedClient = clients[0];
        this.sellersService
          .getClientInfo(this.selectedClient.id, this.selectedSession)
          .subscribe((clientDetails) => {
            this.clientDetails = clientDetails;
          });
      }
    });
  }
}
