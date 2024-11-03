export class CatalogItem {
  unit_price: number;
  qty: number;
  gameName: string;
  gameEditor: string;
  sellerName: string;
  sellerSurname: string;

  constructor(
    unit_price: number,
    qty: number,
    gameName: string,
    gameEditor: string,
    sellerName: string,
    sellerSurname: string
  ) {
    this.unit_price = unit_price;
    this.qty = qty;
    this.gameName = gameName;
    this.gameEditor = gameEditor;
    this.sellerName = sellerName;
    this.sellerSurname = sellerSurname;
  }

  public static createFrom(json: CatalogItem): CatalogItem {
    return new CatalogItem(
      json.unit_price,
      json.qty,
      json.gameName,
      json.gameEditor,
      json.sellerName,
      json.sellerSurname
    );
  }
}
