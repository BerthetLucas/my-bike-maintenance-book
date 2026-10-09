import { BrandConstructorParams } from './brand-constructor-params.model';

export class Brand {
  id: string;
  name: string;
  sparePartOnly: boolean;
  bicycleOnly: boolean;

  constructor({
    id,
    name,
    sparePartOnly,
    bicycleOnly,
  }: BrandConstructorParams) {
    this.id = id;
    this.name = name;
    this.sparePartOnly = sparePartOnly;
    this.bicycleOnly = bicycleOnly;
  }
}
