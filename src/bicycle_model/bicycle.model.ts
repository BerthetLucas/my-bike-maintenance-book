import { Brand } from '../brand/brand.model';

interface BicycleModelConstructorParams {
  id: string;
  name: string;
  brand: Brand;
}

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
