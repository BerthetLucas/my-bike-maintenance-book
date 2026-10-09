import { CreateNewBrandRequestDto } from '../dto/create-new-brand-request.dto';

export class NewBrandMapper {
  fromDto(brand: CreateNewBrandRequestDto) {
    return {
      name: brand.name,
      sparePartOnly: brand.sparePartOnly,
      bicycleOnly: brand.bicycleOnly,
    };
  }
}
