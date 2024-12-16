export class Client {
  id: string;
  email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  public static createFrom(json: Client): Client {
    return new Client(json.id, json.email);
  }
}
