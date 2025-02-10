import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Angular Material Modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Session } from '../../../../models/session';
import { SessionService } from '../../../../services/admin/session.service';

@Component({
  selector: 'app-session-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './session-form-dialog.component.html',
  styleUrl: './session-form-dialog.component.scss',
})
export class SessionFormDialogComponent {
  session: {
    id?: number;
    begin_date?: Date;
    end_date?: Date;
    commission: number;
    fees: number;
  } = {
    begin_date: new Date(),
    end_date: new Date(),
    commission: 0,
    fees: 0,
  };

  constructor(
    private dialogRef: MatDialogRef<SessionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Session,
    private sessionService: SessionService
  ) {
    if (data) {
      this.session = { ...data };
    }
  }

  onSubmit(): void {
    if (this.session?.id != null) {
      // Mise à jour d'un jeu existant
      this.sessionService
        .updateSession(
          this.session as { id: number; commission?: number; fees?: number }
        )
        .subscribe(() => this.dialogRef.close(true));
    } else {
      // Création d'un nouveau jeu
      this.sessionService
        .createSession(
          this.session as {
            begin_date: Date;
            end_date: Date;
            commission: number;
            fees: number;
          }
        )
        .subscribe(() => this.dialogRef.close(true));
    }
  }
}
