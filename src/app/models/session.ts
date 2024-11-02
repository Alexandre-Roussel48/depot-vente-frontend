export class Session {
  id: number;
  begin_date: Date;
  end_date: Date;
  commission: number;
  fees: number;

  constructor(
    id: number,
    begin_date: Date,
    end_date: Date,
    commission: number,
    fees: number
  ) {
    this.id = id;
    this.begin_date = begin_date;
    this.end_date = end_date;
    this.commission = commission;
    this.fees = fees;
  }

  public static createFrom(json: Session): Session {
    return new Session(
      json.id,
      json.begin_date,
      json.end_date,
      json.commission,
      json.fees
    );
  }
}
