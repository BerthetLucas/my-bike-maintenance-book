import { Injectable } from '@nestjs/common';
import { DrizzleBrand } from 'src/db/schema';
import { Brand } from 'src/domain/brand/brand.model';

@Injectable()
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
    return new Brand({
      id: brand.id,
      name: brand.name,
      sparePartOnly: brand.sparePartOnly,
      bicycleOnly: brand.bicycleOnly,
    });
  }
}
