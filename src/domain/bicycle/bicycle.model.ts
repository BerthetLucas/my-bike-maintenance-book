import { BicycleModel } from './bicycle-model/bicycle-model.model';
import { SparePart } from '../spare-part/spare-part';

export interface BicycleConstructorParams {
  id: string;
  name: string;
  isMarked: boolean;
  model: BicycleModel;
  spareParts: SparePart[];
}

export class Bicycle {
  id: string;
  name: string;
  isMarked: boolean;
  model: BicycleModel;
  spareParts: SparePart[];

  constructor({
    id,
    name,
    isMarked,
    model,
    spareParts,
  }: BicycleConstructorParams) {
    this.id = id;
    this.name = name;
    this.isMarked = isMarked;
    this.model = model;
    this.spareParts = spareParts;
  }

  addKm(km: number) {
    this.spareParts.forEach((sp) => sp.addKm(km));
  }

  getWarnings(): string[] {
    return this.spareParts.flatMap((sp) => sp.getWarnings());
  }
}
