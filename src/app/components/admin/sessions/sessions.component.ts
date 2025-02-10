import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Session } from '../../../models/session';
import { SessionService } from '../../../services/admin/session.service';
import { SessionFormDialogComponent } from './session-form-dialog/session-form-dialog.component';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss',
})
export class SessionsComponent {
  displayedColumns: string[] = [
    'id',
    'begin_date',
    'end_date',
    'commission',
    'fees',
    'actions',
  ];
  dataSource = new MatTableDataSource<Session>();
  constructor(
    private sessionService: SessionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  // Charger les jeux
  loadSessions(): void {
    this.sessionService.getSessions().subscribe((sessions) => {
      this.dataSource.data = sessions;
    });
  }

  // Ouvrir le formulaire pour créer ou modifier un jeu
  openSessionFormDialog(session?: Session): void {
    const dialogRef = this.dialog.open(SessionFormDialogComponent, {
      width: '400px',
      data: session ? { ...session } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadSessions(); // Recharger les jeux après une modification
      }
    });
  }

  searchSessions(): void {
    this.loadSessions();
  }
}
