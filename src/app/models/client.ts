export class Client {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  public static createFrom(json: Client): Client {
    return new Client(json.id);
  }
}
