export class RealGame {
  id: string;
  unit_price: number;
  game_id: number;

  constructor(id: string, unit_price: number, game_id: number) {
    this.id = id;
    this.unit_price = unit_price;
    this.game_id = game_id;
  }

  public static createFrom(json: RealGame): RealGame {
    return new RealGame(json.id, json.unit_price, json.game_id);
  }
}
