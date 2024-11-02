import { Component, Input } from '@angular/core';
import { CatalogItem } from '../../../models/catalog-item';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-catalog-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './catalog-item.component.html',
  styleUrl: './catalog-item.component.scss',
})
export class CatalogItemComponent {
  @Input() item!: CatalogItem;
}
