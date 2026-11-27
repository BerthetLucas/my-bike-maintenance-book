import { Brand } from 'src/domain/brand/brand.model';
import { BicycleRequestDto } from '../dto/bicycle-request.dto';
import { BicycleResponseDto } from '../dto/bicycle-response.dto';
import { GetBicycleUseCaseOutPut } from '../usecases/get-bicycle.usecase';
import { SparePart } from 'src/domain/spare-part/spare-part';
import { Bicycle } from 'src/domain/bicycle/bicycle.model';

export class BicycleMapper {
  fromDto(bicycle: BicycleRequestDto): string {
    return bicycle.id;
  }

  toDto(command: GetBicycleUseCaseOutPut): BicycleResponseDto {
    const { bicycle, brand, sparePartsBrands } = command;

    return {
      id: bicycle.id,
      name: bicycle.name,
      isMarked: bicycle.isMarked,
      modelName: bicycle.model.name,
      brandName: brand.name,
      km: bicycle.km,
      spareParts: this.buildSparePartWithBrandName(
        sparePartsBrands,
        bicycle.getSpareParts(),
        bicycle,
      ),
    };
  }

  private buildSparePartWithBrandName(
    sparePartsBrands: Brand[],
    spareParts: SparePart[],
    bicycle: Bicycle,
  ) {
    return spareParts.map((sp) => {
      const sparePartBrand = sparePartsBrands.find(
        (b) => b.id === sp.getBrandId(),
      );

      if (!sparePartBrand) {
        throw new Error('erreur');
      }

      return {
        id: sp.getId(),
        type: sp.getSparePartType(),
        km: sp.getKm(),
        mountedAt: sp.getmountedAt(),
        brandName: sparePartBrand.name,
        warnings: sp.getWarnings(bicycle.model.usage),
      };
    });
  }
}
