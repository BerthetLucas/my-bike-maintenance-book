import { DrizzleNewBrand } from 'src/db/schema';
import { CreateNewBrandRequestDto } from '../dto/create-new-brand-request.dto';
import { NewBrand } from '../models/new-brand.model';

export class CreateBrandMapper {
  fromDto(brand: CreateNewBrandRequestDto): NewBrand {
    return {
      name: brand.name,
      sparePartOnly: brand.sparePartOnly,
      bicycleOnly: brand.bicycleOnly,
    };
  }

  fromDomain(brand: NewBrand): DrizzleNewBrand {
    return {
      name: brand.name,
      sparePartOnly: brand.sparePartOnly,
      bicycleOnly: brand.bicycleOnly,
    };
  }
}
