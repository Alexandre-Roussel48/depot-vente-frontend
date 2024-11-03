import { Component, Input } from '@angular/core';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';
import { CatalogItem } from './../../../models/catalog-item';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CatalogItemComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  @Input() catalog!: CatalogItem[];
}
