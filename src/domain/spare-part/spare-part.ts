import { Brand } from '../brand/brand.model';

export interface SpareConstructorParams {
  id: string;
  km: number;
  time: Date;
  brand: Brand;
}

export abstract class SparePart {
  private km: number;
  private id: string;
  private mountedAt: Date;
  private brand: Brand;

  constructor({ km, id, time, brand }: SpareConstructorParams) {
    if (brand.bicycleOnly) {
      throw new Error('This brand is for bicycle only');
    }

    this.km = km;
    this.id = id;
    this.mountedAt = time;
    this.brand = brand;
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

  getBrand(): Brand {
    return this.brand;
  }
}
