export interface BrandConstructorParams {
  id: string;
  name: string;
  sparePartOnly: boolean;
  bicycleOnly: boolean;
}

export type NewBrand = Omit<BrandConstructorParams, 'id'>;

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

  getBrandId() {
    return this.id;
  }

  getBrandName() {
    return this.name;
  }

  getIsSparePartOnly() {
    return this.sparePartOnly;
  }

  getIsBicycleOnly() {
    return this.bicycleOnly;
  }
}
