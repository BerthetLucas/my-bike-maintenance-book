import { randomUUID } from 'crypto';
import { SparePart } from 'src/domain/spare-part/spare-part';
import { Tire } from 'src/domain/spare-part/tire';
import { Brake } from 'src/domain/spare-part/brake';
import { Chain } from 'src/domain/spare-part/chain';
import { MountSparePartDto } from '../dto/mount-spare-part.dto';

export class MountSparePartMapper {
  fromDto(dto: MountSparePartDto): SparePart {
    const common = {
      id: randomUUID(),
      brandId: dto.brandId,
      km: dto.km,
      mountedAt: new Date(dto.mountedAt),
    };

    switch (dto.type) {
      case 'Tire':
        if (!dto.season || dto.recommendedPressure === undefined) {
          throw new Error(
            'A tire must have a season and a recommended pressure',
          );
        }
        return new Tire({
          ...common,
          season: dto.season,
          recommendedPressure: dto.recommendedPressure,
        });
      case 'Brake':
        return new Brake(common);
      case 'Chain':
        return new Chain(common);
    }
  }
}
