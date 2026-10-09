import { DrizzleBrand } from 'src/db/schema';
import { Brand } from '../models/brand.model';

export class DrizzleBrandMapper {
  fromDomain(brand: Brand): DrizzleBrand {
    return {
      id: brand.id,
      name: brand.name,
      sparePartOnly: brand.sparePartOnly,
      bicycleOnly: brand.bicycleOnly,
    };
  }

  toDomain(brand: DrizzleBrand): Brand {
    return {
      id: brand.id,
      name: brand.name,
      sparePartOnly: brand.sparePartOnly,
      bicycleOnly: brand.bicycleOnly,
    };
  }
}
