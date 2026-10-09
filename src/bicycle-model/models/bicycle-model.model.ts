import { Brand } from '../../brand/models/brand.model';
import { BicycleModelConstructorParams } from './bicycle-model-constructor-params.model';

export class BicycleModel {
  id: string;
  name: string;
  brand: Brand;

  constructor({ id, name, brand }: BicycleModelConstructorParams) {
    this.id = id;
    this.name = name;
    this.brand = brand;
  }
}
