import { Client } from './client';
export enum Type {
  DEPOSIT = 'DEPOSIT',
  COMMISSION = 'COMMISSION',
  SALE = 'SALE',
  PAY = 'PAY',
}

export class Transaction {
  id: number;
  session_id: number;
  seller_id: string;
  date: Date;
  value: number;
  type: Type;
  realgame_id: string;
  seller: Client;

  constructor(
    id: number,
    session_id: number,
    seller_id: string,
    date: Date,
    value: number,
    type: Type,
    realgame_id: string,
    seller: Client
  ) {
    this.id = id;
    this.session_id = session_id;
    this.seller_id = seller_id;
    this.date = date;
    this.value = value;
    this.type = type;
    this.realgame_id = realgame_id;
    this.seller = seller;
  }

  public static createFrom(json: Transaction): Transaction {
    return new Transaction(
      json.id,
      json.session_id,
      json.seller_id,
      new Date(json.date), // Convertir la date en objet Date
      json.value,
      json.type as Type, // Assurer que le type est correct
      json.realgame_id,
      json.seller as Client
    );
  }
}
