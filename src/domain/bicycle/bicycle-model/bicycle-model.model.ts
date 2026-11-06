import { Brand } from '../../brand/brand.model';
import { Usage } from '../bicycle-usage';

export interface BicycleModelConstructorParams {
  id: string;
  name: string;
  brand: Brand;
  usage: Usage;
}

export class BicycleModel {
  id: string;
  name: string;
  brand: Brand;
  usage: Usage;

  constructor({ id, name, brand, usage }: BicycleModelConstructorParams) {
    if (brand.sparePartOnly) {
      throw new Error('This brand is for spare part only');
    }

    this.id = id;
    this.name = name;
    this.brand = brand;
    this.usage = usage;
  }
}
