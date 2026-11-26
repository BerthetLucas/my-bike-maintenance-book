import { Usage } from '../bicycle/bicycle-usage';
import { Warning } from './warning';

export interface SpareConstructorParams {
  id: string;
  km: number;
  mountedAt: Date;
  brandId: string;
}

export abstract class SparePart {
  private km: number;
  private id: string;
  private mountedAt: Date;
  private brandId: string;

  constructor({ km, id, mountedAt, brandId }: SpareConstructorParams) {
    this.km = km;
    this.id = id;
    this.mountedAt = mountedAt;
    this.brandId = brandId;
  }

  abstract getWarnings(usage: Usage): Warning[];

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

  getBrandId(): string {
    return this.brandId;
  }
}
