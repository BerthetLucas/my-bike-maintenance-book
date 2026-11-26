import { Usage } from '../bicycle-usage';

export interface BicycleModelConstructorParams {
  id: string;
  name: string;
  brandId: string;
  usage: Usage;
}

export class BicycleModel {
  id: string;
  name: string;
  brandId: string;
  usage: Usage;

  constructor({ id, name, brandId, usage }: BicycleModelConstructorParams) {
    this.id = id;
    this.name = name;
    this.brandId = brandId;
    this.usage = usage;
  }
}
