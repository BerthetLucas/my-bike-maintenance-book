import { DrizzleBrand, DrizzleNewBrand } from 'src/db/schema';
import {
  Brand,

} from './brand.model';
import { CreateNewBrandRequestDto } from './dto/create-new-brand-request.dto';
import { GetBrandRequestDto } from './dto/get-brand-request.dto';
import { GetBrandResponseDto } from './dto/get-brand-response.dto';
import { NewBrand } from './new-brand.model';

export class BrandMapper {
  fromDto(brand: GetBrandRequestDto): string {
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
