import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from '../../../../services/admin/game.service';

// Angular Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Game } from '../../../../models/game';

@Component({
  selector: 'app-game-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './game-form-dialog.component.html',
})
export class GameFormDialogComponent {
  game: { id?: number; name: string; editor: string } = {
    name: '',
    editor: '',
  };

  constructor(
    private dialogRef: MatDialogRef<GameFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Game,
    private gameService: GameService
  ) {
    if (data) {
      this.game = { ...data };
    }
  }

  onSubmit(): void {
    if (this.game?.id != null) {
      // Mise à jour d'un jeu existant
      this.gameService
        .updateGame(this.game as { id: number; name?: string; editor?: string })
        .subscribe(() => this.dialogRef.close(true));
    } else {
      // Création d'un nouveau jeu
      this.gameService
        .createGame(this.game as { name: string; editor: string })
        .subscribe(() => this.dialogRef.close(true));
    }
  }
}
