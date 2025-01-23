export class Game {
  id: number;
  name: string;
  editor: string;

  constructor(id: number, name: string, editor: string) {
    this.id = id;
    this.name = name;
    this.editor = editor;
  }

  public static createFrom(json: Game): Game {
    return new Game(json.id, json.name, json.editor);
  }
}
