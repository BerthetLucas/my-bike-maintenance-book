import { Usage } from '../bicycle/bicycle-usage';
import { SpareConstructorParams, SparePart } from './spare-part';
import { Warning } from './warning';

type TireSeason = 'winter' | 'summer';

export interface TireConstructorParams extends SpareConstructorParams {
  recommendedPressure: number;
  season: TireSeason;
}

export class Tire extends SparePart {
  recommendedPressure: number;
  season: TireSeason;

  constructor({
    recommendedPressure,
    season,
    ...parent
  }: TireConstructorParams) {
    super(parent);
    this.recommendedPressure = recommendedPressure;
    this.season = season;
  }

  // TODO: This is full of magic number !!!
  getWarnings(usage: Usage): Warning[] {
    if (this.season === 'summer' && this.getKm() >= 3_000 && usage === 'VTT') {
      return [Warning.of('Remplacer le pneu')];
    }

    if (this.season === 'summer' && this.getKm() >= 5_000 && usage === 'Road') {
      return [Warning.of('Remplacer le pneu')];
    }

    if (this.season === 'winter' && this.getKm() >= 5_000) {
      return [Warning.of('Remplacer le pneu')];
    }

    return [];
  }
}
