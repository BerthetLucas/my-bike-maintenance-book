import { DrizzleNewBrand } from 'src/db/schema';
import { NewBrand } from '../models/new-brand.model';

export class DrizzleNewBrandMapper {
  fromDomain(brand: NewBrand): DrizzleNewBrand {
    return {
      name: brand.name,
      sparePartOnly: brand.sparePartOnly,
      bicycleOnly: brand.bicycleOnly,
    };
  }
}
