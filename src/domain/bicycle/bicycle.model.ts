import { BicycleModel } from './bicycle-model/bicycle-model.model';
import { SparePart } from '../spare-part/spare-part';
import { Warning } from '../spare-part/warning';
import { Tire } from '../spare-part/tire';
import { Brake } from '../spare-part/brake';
import { Chain } from '../spare-part/chain';
import { SparePartsInconsistencyError } from './errors/spare-parts-inconsistency.error';
import { NegativeDistanceError } from './errors/negative-distance.error';

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

    this.validate();
  }

  addKm(km: number) {
    if (km < 1) {
      throw new NegativeDistanceError(
        'An add distance can not be less than 1 km',
      );
    }

    this.spareParts.forEach((sp) => sp.addKm(km));
    this.km += km;
    this.validate();
  }

  getWarnings(): Warning[] {
    return this.spareParts.flatMap((sp) => sp.getWarnings(this.model.usage));
  }

  getSpareParts(): SparePart[] {
    return this.spareParts;
  }

  mountSparePart(spareParts: SparePart[]): void {
    this.spareParts.push(...spareParts);
    this.validate();
  }

  validate() {
    if (this.spareParts.filter((part) => part instanceof Tire).length > 2) {
      throw new SparePartsInconsistencyError(
        "A bicycle can't have more than two tires",
      );
    }

    if (this.spareParts.filter((part) => part instanceof Brake).length > 2) {
      throw new SparePartsInconsistencyError(
        "A bicycle can't have more than two brakes",
      );
    }

    if (this.spareParts.filter((part) => part instanceof Chain).length > 1) {
      throw new SparePartsInconsistencyError(
        'A bicycle can only contain one unit of these parts',
      );
    }
  }
}
