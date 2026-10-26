export interface SpareConstructorParams {
  id: string;
  km: number;
}

export abstract class SparePart {
  private km: number;
  private id: string;

  constructor({ km, id }: SpareConstructorParams) {
    this.km = km;
    this.id = id;
  }

  abstract getWarnings(): string[];

  addKm(km: number) {
    this.km += km;
  }

  getKm(): number {
    return this.km;
  }

  getId(): string {
    return this.id;
  }
}
