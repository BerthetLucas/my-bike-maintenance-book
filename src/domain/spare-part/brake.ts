import { differenceInYears } from 'date-fns';
import { Usage } from '../bicycle/bicycle-usage';
import { SpareConstructorParams, SparePart } from './spare-part';
import { Warning } from './warning';

type Wear = 'new' | 'little' | 'medium' | 'advanced';

interface BrakeConstructorParams extends SpareConstructorParams {
  wear: Wear;
}

export class Brake extends SparePart {
  wear: Wear;

  constructor({ wear, ...parent }: BrakeConstructorParams) {
    super(parent);
    this.wear = wear;
  }

  getWarnings(usage: Usage): Warning[] {
    const maxKm = usage === 'VTT' ? 1_500 : 3_000;

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
