import { RealGame } from './real-game';

export class ClientDetails {
  due: number;
  paidAmount: number;
  soldRG: { id: string; unit_price: number; game_id: number }[];
  stockedRG: { id: string; unit_price: number; game_id: number }[];

  constructor(
    due: number,
    paidAmount: number,
    soldRG: { id: string; unit_price: number; game_id: number }[],
    stockedRG: { id: string; unit_price: number; game_id: number }[]
  ) {
    this.due = due;
    this.paidAmount = paidAmount;
    this.soldRG = soldRG;
    this.stockedRG = stockedRG;
  }

  public static createFrom(json: ClientDetails): ClientDetails {
    return new ClientDetails(
      json.due,
      json.paidAmount,
      json.soldRG
        ? json.soldRG.map((game: RealGame) => ({
            id: game.id,
            unit_price: game.unit_price,
            game_id: game.game_id,
          }))
        : [],
      json.stockedRG
        ? json.stockedRG.map((game: RealGame) => ({
            id: game.id,
            unit_price: game.unit_price,
            game_id: game.game_id,
          }))
        : []
    );
  }
}
