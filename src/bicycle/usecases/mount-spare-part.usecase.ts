import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import { MountSparePartDto } from '../dto/mount-spare-part.dto';
import { BrandRepository } from 'src/brand/brand.respository';
import { Brand } from 'src/domain/brand/brand.model';
import { SparePart } from 'src/domain/spare-part/spare-part';
import { randomUUID } from 'crypto';
import { Tire } from 'src/domain/spare-part/tire';
import { Chain } from 'src/domain/spare-part/chain';
import { Brake } from 'src/domain/spare-part/brake';

@Injectable()
export class MountSparePartUseCase {
  constructor(
    private readonly bicycleRepository: BicycleRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(
    bicycleId: string,
    spareParts: MountSparePartDto[],
  ): Promise<void> {
    const bicycle = await this.bicycleRepository.getById(bicycleId);

    const sparePartList: SparePart[] = [];

    for (const sparePart of spareParts) {
      const sparePartBrand = await this.brandRepository.getOne(
        sparePart.brandId,
      );

      const uniqSparePart = this.buildSparePart(sparePart, sparePartBrand);

      sparePartList.push(uniqSparePart);
    }

    bicycle.mountSparePart(sparePartList);
    await this.bicycleRepository.save(bicycle);
  }

  private buildSparePart(
    sparePart: MountSparePartDto,
    brand: Brand,
  ): SparePart {
    const common = {
      id: randomUUID(),
      km: sparePart.km,
      mountedAt: new Date(sparePart.mountedAt),
      brand,
    };

    if (sparePart.type === 'Tire') {
      if (!sparePart.season || !sparePart.recommendedPressure) {
        throw new Error(
          'A tire should have a season or a recommended pressure',
        );
      }

      return new Tire({
        ...common,
        season: sparePart.season,
        recommendedPressure: sparePart.recommendedPressure,
      });
    }

    if (sparePart.type === 'Brake') {
      return new Brake(common);
    }

    return new Chain(common);
  }
}
