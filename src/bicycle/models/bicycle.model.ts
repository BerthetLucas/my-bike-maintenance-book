import { BicycleModel } from '../../bicycle-model/models/bicycle-model.model';
import { BicycleConstructorParams } from './bicycle-constructor-params.model';

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
