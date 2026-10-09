import { Brand } from '../models/brand.model';
import { BrandRequestDto } from '../dto/brand-request.dto';
import { BrandResponseDto } from '../dto/brand-response.dto';

export class BrandMapper {
  fromDto(brand: BrandRequestDto): string {
    return brand.id;
  }

  toDto(brand: Brand): BrandResponseDto {
    return {
      id: brand.id,
      name: brand.name,
      sparePartOnly: brand.sparePartOnly,
      bicycleOnly: brand.bicycleOnly,
    };
  }
}
