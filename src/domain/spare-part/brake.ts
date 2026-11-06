import { differenceInYears } from 'date-fns';
import { Usage } from '../bicycle/bicycle-usage';
import { SpareConstructorParams, SparePart } from './spare-part';
import { Warning } from './warning';

type BrakeConstructorParams = SpareConstructorParams;

export class Brake extends SparePart {
  constructor({ ...parent }: BrakeConstructorParams) {
    super(parent);
  }

  getWarnings(usage: Usage): Warning[] {
    const maxKm = usage === 'VTT' ? 1_500 : 3_000;

    if (
      differenceInYears(new Date(), this.getmountedAt()) >= 1 ||
      this.getKm() > maxKm
    ) {
      return [Warning.of('Veuillez vérifier les freins')];
    }

    return [];
  }
}
