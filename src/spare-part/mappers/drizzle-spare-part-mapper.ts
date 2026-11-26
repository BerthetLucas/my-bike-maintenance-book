import { Injectable } from '@nestjs/common';
import { DrizzleNewSparePart, DrizzleSparePart } from 'src/db/schema';
import { Brake } from 'src/domain/spare-part/brake';
import { Chain } from 'src/domain/spare-part/chain';
import { SparePart } from 'src/domain/spare-part/spare-part';
import { Tire } from 'src/domain/spare-part/tire';

@Injectable()
export class DrizzleSparePartMapper {
  toDomain(drizzleSparePart: DrizzleSparePart): SparePart {
    const { type, id, mountedAt, km, brandId, recommendedPressure, season } =
      drizzleSparePart;

    if (type === 'Brake') {
      return new Brake({
        id,
        mountedAt,
        km,
        brandId,
      });
    }

    if (type === 'Chain') {
      return new Chain({
        id,
        mountedAt,
        km,
        brandId,
      });
    }

    if (recommendedPressure === null || !season) {
      throw new Error('A tire must have a recommendedPressure and a season');
    }
    return new Tire({
      id,
      mountedAt,
      km,
      brandId,
      recommendedPressure,
      season,
    });
  }

  fromDomain(sparePart: SparePart, bicycleId: string): DrizzleNewSparePart {
    const common = {
      id: sparePart.getId(),
      km: sparePart.getKm(),
      mountedAt: sparePart.getmountedAt(),
      brandId: sparePart.getBrandId(),
      bicycleId,
      isMountedOnABicycle: true,
    };

    if (sparePart instanceof Tire) {
      return {
        ...common,
        type: 'Tire',
        season: sparePart.season,
        recommendedPressure: sparePart.recommendedPressure,
      };
    }

    if (sparePart instanceof Brake) {
      return {
        ...common,
        type: 'Brake',
      };
    }

    if (sparePart instanceof Chain) {
      return { ...common, type: 'Chain' };
    }

    throw new Error('Unknown spare part type');
  }
}
