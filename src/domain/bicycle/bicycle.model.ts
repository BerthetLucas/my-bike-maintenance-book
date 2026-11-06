import { BicycleModel } from './bicycle-model/bicycle-model.model';
import { SparePart } from '../spare-part/spare-part';
import { Warning } from '../spare-part/warning';

export interface BicycleConstructorParams {
  id: string;
  name: string;
  isMarked: boolean;
  model: BicycleModel;
  km: number;
  spareParts: SparePart[];
}

export class Bicycle {
  id: string;
  name: string;
  isMarked: boolean;
  model: BicycleModel;
  km: number;
  spareParts: SparePart[];

  constructor({
    id,
    name,
    isMarked,
    model,
    km,
    spareParts,
  }: BicycleConstructorParams) {
    this.id = id;
    this.name = name;
    this.isMarked = isMarked;
    this.model = model;
    this.km = km;
    this.spareParts = spareParts;
  }

  addKm(km: number) {
    this.spareParts.forEach((sp) => sp.addKm(km));
    this.km += km;
  }

  getWarnings(): Warning[] {
    return this.spareParts.flatMap((sp) => sp.getWarnings(this.model.usage));
  }

  getSpareParts(): SparePart[] {
    return this.spareParts;
  }
}
