import { BicycleUsage } from '../bicycle/bicycle-usage.model';
import { SpareConstructorParams, SparePart } from './spare-part';
import { Warning } from './warning';

type TireSeason = 'winter' | 'summer';

export interface TireConstructorParams extends SpareConstructorParams {
  recommendedPressure: number;
  season: TireSeason;
  usage: BicycleUsage;
}

export class Tire extends SparePart {
  recommendedPressure: number;
  season: TireSeason;
  usage: BicycleUsage;

  // TODO: This is full of magic number !!!
  getWarnings(): Warning[] {
    if (
      this.season === 'summer' &&
      this.getKm() >= 3_000 &&
      this.usage.getBikeType() === 'VTT'
    ) {
      return [Warning.of('Remplacer le pneu')];
    }

    if (
      this.season === 'summer' &&
      this.getKm() >= 5_000 &&
      this.usage.getBikeType() === 'Road'
    ) {
      return [Warning.of('Remplacer le pneu')];
    }

    if (this.season === 'winter' && this.getKm() >= 5_000) {
      return [Warning.of('Remplacer le pneu')];
    }

    return [];
  }

  constructor({
    recommendedPressure,
    season,
    usage,
    ...parent
  }: TireConstructorParams) {
    super(parent);
    this.recommendedPressure = recommendedPressure;
    this.season = season;
    this.usage = usage;
  }
}
