import { BicycleUsage } from '../bicycle/bicycle-usage.model';
import { SpareConstructorParams, SparePart } from './spare-part';
import { Warning } from './warning';

export interface ChainConstructorParams extends SpareConstructorParams {
  usage: BicycleUsage;
}

export class Chain extends SparePart {
  usage: BicycleUsage;

  constructor({ usage, ...parent }: ChainConstructorParams) {
    super(parent);
    this.usage = usage;
  }

  getWarnings(): Warning[] {
    const maxKm = this.usage.getBikeType() === 'VTT' ? 2_000 : 3_500;

    if (this.getKm() > maxKm) {
      return [Warning.of('Remplacer la chaîne')];
    }

    if (this.getKm() > maxKm * 0.75) {
      return [Warning.of('Vérifier la chaîne')];
    }

    return [];
  }
}
