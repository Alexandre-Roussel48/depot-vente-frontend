export class SaleItem {
  unit_price: number;
  gameName: string;
  gameEditor: string;
  id: string;

  constructor(
    unit_price: number,
    gameName: string,
    gameEditor: string,
    id: string
  ) {
    this.unit_price = unit_price;
    this.gameName = gameName;
    this.gameEditor = gameEditor;
    this.id = id;
  }

  public static createFrom(json: SaleItem): SaleItem {
    return new SaleItem(
      json.unit_price,
      json.gameName,
      json.gameEditor,
      json.id
    );
  }
}
