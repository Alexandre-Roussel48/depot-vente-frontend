export class ClientDetails {
  dueAmount: number;
  earnings: number;
  soldGames: { name: string; quantity: number; unitPrice: number }[];
  stockGames: { name: string; quantity: number }[];

  constructor(
    dueAmount: number,
    earnings: number,
    soldGames: { name: string; quantity: number; unitPrice: number }[],
    stockGames: { name: string; quantity: number }[]
  ) {
    this.dueAmount = dueAmount;
    this.earnings = earnings;
    this.soldGames = soldGames;
    this.stockGames = stockGames;
  }

  public static createFrom(json: ClientDetails): ClientDetails {
    return new ClientDetails(
      json.dueAmount,
      json.earnings,
      json.soldGames,
      json.stockGames
    );
  }
}
