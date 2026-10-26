import { BicycleUsecase } from '../bicycle/bicycle-usecase.model';
import { SpareConstructorParams, SparePart } from './spare-part';

type Wear = 'little' | 'medium' | 'advanced';

interface BrakeConstructorParams extends SpareConstructorParams {
  wear: Wear;
  usecase: BicycleUsecase;
}

export class Brake extends SparePart {
  wear: Wear;
  usecase: BicycleUsecase;

  getWarnings(): string[] {
    return [];
  }

  constructor({ wear, usecase, ...parent }: BrakeConstructorParams) {
    super(parent);
    this.wear = wear;
    this.usecase = usecase;
  }
}
