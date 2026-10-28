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

  getWarnings(): string[] {
    const maxKm = this.usage.getBikeType() === 'VTT' ? 1_500 : 3_000;

    if (
      differenceInYears(new Date(), this.getmountedAt()) >= 1 ||
      this.getKm() > maxKm
    ) {
      return ['Veuillez vérifier les freins'];
    }

    // TODO: Add other conditions

    return [];
  }

  constructor({ wear, usage, ...parent }: BrakeConstructorParams) {
    super(parent);
    this.wear = wear;
    this.usage = usage;
  }
}
