export class Ingredient {
  public id?: number;
  public name: string;
  public amount: number;
  public unit: string;

  constructor(name: string, amount: number, id: number, unit: string) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }
}
