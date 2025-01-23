export class RealGame {
  unit_price: number;
  gameName: string;
  gameEditor: string;
  qty: number;

  constructor(
    unit_price: number,
    gameName: string,
    gameEditor: string,
    qty: number
  ) {
    this.unit_price = unit_price;
    this.gameName = gameName;
    this.gameEditor = gameEditor;
    this.qty = qty;
  }

  public static createFrom(json: RealGame): RealGame {
    return new RealGame(
      json.unit_price,
      json.gameName,
      json.gameEditor,
      json.qty
    );
  }
}
