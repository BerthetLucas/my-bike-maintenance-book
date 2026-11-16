import { Injectable } from '@nestjs/common';
import { DrizzleBrandMapper } from 'src/brand/mappers/drizzle-brand.mapper';
import { DrizzleBrand, DrizzleSparePart } from 'src/db/schema';
import { Brake } from 'src/domain/spare-part/brake';
import { Chain } from 'src/domain/spare-part/chain';
import { SparePart } from 'src/domain/spare-part/spare-part';
import { Tire } from 'src/domain/spare-part/tire';

@Injectable()
export class DrizzleSparePartMapper {
  constructor(private readonly brandMapper: DrizzleBrandMapper) {}
  toDomain(
    drizzleSparePart: DrizzleSparePart,
    drizzleBrand: DrizzleBrand,
  ): SparePart {
    const { type, id, mountedAt, km, recommendedPressure, season } =
      drizzleSparePart;

    const brand = this.brandMapper.toDomain(drizzleBrand);

    if (type === 'Brake') {
      return new Brake({
        id,
        mountedAt,
        km,
        brand,
      });
    }

    if (type === 'Chain') {
      return new Chain({
        id,
        mountedAt,
        km,
        brand,
      });
    }

    if (!recommendedPressure || !season) {
      throw new Error('A tire should have a recommendedPressure or a season');
    }
    return new Tire({
      id,
      mountedAt,
      km,
      brand,
      recommendedPressure,
      season,
    });
  }
}
