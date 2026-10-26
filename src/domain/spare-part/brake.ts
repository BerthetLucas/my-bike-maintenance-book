import { differenceInYears } from 'date-fns';
import { BicycleUsecase } from '../bicycle/bicycle-usecase.model';
import { SpareConstructorParams, SparePart } from './spare-part';

type Wear = 'new' | 'little' | 'medium' | 'advanced';

interface BrakeConstructorParams extends SpareConstructorParams {
  wear: Wear;
  usecase: BicycleUsecase;
}

export class Brake extends SparePart {
  wear: Wear;
  usecase: BicycleUsecase;

  getWarnings(): string[] {
    if (
      differenceInYears(new Date(), this.getmountedAt()) >= 1 ||
      this.getKm() > 2000
    ) {
      return ['Veuillez vérifier les freins'];
    }

    // TODO: Add other conditions

    return [];
  }

  constructor({ wear, usecase, ...parent }: BrakeConstructorParams) {
    super(parent);
    this.wear = wear;
    this.usecase = usecase;
  }
}
