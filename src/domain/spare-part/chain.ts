import { BicycleUsage } from '../bicycle/bicycle-usage.model';
import { SpareConstructorParams, SparePart } from './spare-part';

interface ChainConstructorParams extends SpareConstructorParams {
  usage: BicycleUsage;
}

export class Chain extends SparePart {
  usage: BicycleUsage;

  constructor({ usage, ...parent }: ChainConstructorParams) {
    super(parent);
    this.usage = usage;
  }

  getWarnings(): string[] {
    const maxKm = this.usage.getBikeType() === 'VTT' ? 2_000 : 3_500;

    if (this.getKm() > maxKm) {
      return ['Changer la chaine'];
    }

    if (this.getKm() > maxKm * 0.75) {
      return ['Mesurer l’usure de la chaine avec un testeur'];
    }

    return [];
  }
}
