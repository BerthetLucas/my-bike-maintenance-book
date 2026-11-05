import { differenceInYears } from 'date-fns';
import { BicycleUsage } from '../bicycle/bicycle-usage.model';
import { SpareConstructorParams, SparePart } from './spare-part';
import { Warning } from './warning';

type Wear = 'new' | 'little' | 'medium' | 'advanced';

interface BrakeConstructorParams extends SpareConstructorParams {
  wear: Wear;
  usage: BicycleUsage;
}

export class Brake extends SparePart {
  wear: Wear;
  usage: BicycleUsage;

  constructor({ wear, usage, ...parent }: BrakeConstructorParams) {
    super(parent);
    this.wear = wear;
    this.usage = usage;
  }

  getWarnings(): Warning[] {
    const maxKm = this.usage.getBikeType() === 'VTT' ? 1_500 : 3_000;

    if (this.wear === 'advanced') {
      return [Warning.of('Changer les plaquettes de frein')];
    }

    if (
      differenceInYears(new Date(), this.getmountedAt()) >= 1 ||
      this.getKm() > maxKm
    ) {
      return [Warning.of('Veuillez vérifier les freins')];
    }

    if (this.wear === 'medium' && this.getKm() > maxKm / 2) {
      return [Warning.of('Surveiller l’usure des plaquettes de frein')];
    }

    return [];
  }
}
