import { BicycleModel } from '../bicycle_model/bicycle.model';

interface BicycleConstructorParams {
  id: string;
  name: string;
  isMarked: boolean;
  model: BicycleModel;
}

export class Bicycle {
  id: string;
  name: string;
  isMarked: boolean;
  model: BicycleModel;

  constructor({ id, name, isMarked, model }: BicycleConstructorParams) {
    this.id = id;
    this.name = name;
    this.isMarked = isMarked;
    this.model = model;
  }
}
