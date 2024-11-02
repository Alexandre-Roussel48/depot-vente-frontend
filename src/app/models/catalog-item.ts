export class CatalogItem {
  unit_price: number;
  qty: number;
  name: string;
  editor: string;
  seller_id: string;

  constructor(
    unit_price: number,
    qty: number,
    name: string,
    editor: string,
    seller_id: string
  ) {
    this.unit_price = unit_price;
    this.qty = qty;
    this.name = name;
    this.editor = editor;
    this.seller_id = seller_id;
  }

  public static createFrom(json: CatalogItem): CatalogItem {
    return new CatalogItem(
      json.unit_price,
      json.qty,
      json.name,
      json.editor,
      json.seller_id
    );
  }
}
