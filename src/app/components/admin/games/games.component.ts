import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from '../../../services/admin/game.service';
import { Game } from '../../../models/game';
import { GameFormDialogComponent } from './game-form-dialog/game-form-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
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
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'editor', 'actions'];
  dataSource = new MatTableDataSource<Game>();
  searchQuery: string = '';

  constructor(
    private gameService: GameService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadGames();
  }

  // Charger les jeux
  loadGames(): void {
    const query = this.searchQuery || '';
    this.gameService.getGames(query).subscribe((games) => {
      this.dataSource.data = games;
    });
  }

  // Ouvrir le formulaire pour créer ou modifier un jeu
  openGameFormDialog(game?: Game): void {
    const dialogRef = this.dialog.open(GameFormDialogComponent, {
      width: '400px',
      data: game ? { ...game } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadGames(); // Recharger les jeux après une modification
      }
    });
  }

  // Supprimer un jeu
  deleteGame(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) {
      this.gameService.deleteGame(id).subscribe(() => {
        this.loadGames(); // Recharger les jeux après suppression
      });
    }
  }

  // Rechercher des jeux
  searchGames(): void {
    this.loadGames();
  }
}
