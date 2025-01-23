import { RealGame } from './real-game';

export class ClientDetails {
  due: number;
  paidAmount: number;
  soldRG: RealGame[];
  stockedRG: RealGame[];

  constructor(
    due: number,
    paidAmount: number,
    soldRG: RealGame[],
    stockedRG: RealGame[]
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
            unit_price: game.unit_price,
            gameName: game.gameName,
            gameEditor: game.gameEditor,
            qty: game.qty,
          }))
        : [],
      json.stockedRG
        ? json.stockedRG.map((game: RealGame) => ({
            unit_price: game.unit_price,
            gameName: game.gameName,
            gameEditor: game.gameEditor,
            qty: game.qty,
          }))
        : []
    );
  }
}
