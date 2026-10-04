import { DrizzleBrand, DrizzleNewBrand } from 'src/db/schema';
import {
  Brand,
  CreateNewBrandRequestDto,
  GetBrandResponseDto,
  GetBrandResquestDto,
  NewBrand,
} from './brand.model';

export class BrandMapper {
  fromDto(brand: GetBrandResquestDto): string {
    return brand.id;
  }

  toDto(brand: Brand): GetBrandResponseDto {
    return {
      id: brand.id,
      name: brand.name,
      sparePartOnly: brand.sparePartOnly,
      bicycleOnly: brand.bicycleOnly,
    };
  }
}

export class NewBrandMapper {
  fromDto(brand: CreateNewBrandRequestDto) {
    return {
      name: brand.name,
      sparePartOnly: brand.sparePartOnly,
      bicycleOnly: brand.bicycleOnly,
    };
  }
}

export class DrizzleNewBrandMapper {
  fromDomain(brand: NewBrand): DrizzleNewBrand {
    return {
      name: brand.name,
      sparePartOnly: brand.sparePartOnly,
      bicycleOnly: brand.bicycleOnly,
    };
  }
}

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
