export interface SpareConstructorParams {
  id: string;
  km: number;
  time: Date;
}

export abstract class SparePart {
  private km: number;
  private id: string;
  private mountedAt: Date;

  constructor({ km, id, time }: SpareConstructorParams) {
    this.km = km;
    this.id = id;
    this.mountedAt = time;
  }

  abstract getWarnings(): string[];

  addKm(km: number) {
    this.km += km;
  }

  getKm(): number {
    return this.km;
  }

  setMountedAt(mountedAt: Date) {
    this.mountedAt = mountedAt;
  }

  getmountedAt(): Date {
    return this.mountedAt;
  }

  getId(): string {
    return this.id;
  }
}
