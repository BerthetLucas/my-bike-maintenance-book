import { Usage } from '../bicycle/bicycle-usage';
import { SpareConstructorParams, SparePart } from './spare-part';
import { Warning } from './warning';

export type ChainConstructorParams = SpareConstructorParams;

export class Chain extends SparePart {
  constructor(params: ChainConstructorParams) {
    super(params);
  }

  getWarnings(usage: Usage): Warning[] {
    const maxKm = usage === 'VTT' ? 2_000 : 3_500;

    if (this.getKm() > maxKm) {
      return [Warning.of('Remplacer la chaîne')];
    }

    if (this.getKm() > maxKm * 0.75) {
      return [Warning.of('Vérifier la chaîne')];
    }

    return [];
  }
}
