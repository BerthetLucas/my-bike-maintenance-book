import { differenceInYears } from 'date-fns';
import { BicycleUsage } from '../bicycle/bicycle-usage.model';
import { SpareConstructorParams, SparePart } from './spare-part';

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

  getWarnings(): string[] {
    const maxKm = this.usage.getBikeType() === 'VTT' ? 1_500 : 3_000;

    if (this.wear === 'advanced') {
      return ['Changer les plaquettes de frein'];
    }

    if (
      differenceInYears(new Date(), this.getmountedAt()) >= 1 ||
      this.getKm() > maxKm
    ) {
      return ['Veuillez vérifier les freins'];
    }

    if (this.wear === 'medium' && this.getKm() > maxKm / 2) {
      return ['Surveiller l’usure des plaquettes de frein'];
    }

    return [];
  }
}
