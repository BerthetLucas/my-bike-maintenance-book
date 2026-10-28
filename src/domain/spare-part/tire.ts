import { BicycleUsage } from '../bicycle/bicycle-usage.model';
import { SpareConstructorParams, SparePart } from './spare-part';

type TireSeason = 'winter' | 'summer';

interface TireConstructorParams extends SpareConstructorParams {
  recommendedPressure: number;
  season: TireSeason;
  usage: BicycleUsage;
}

export class Tire extends SparePart {
  recommendedPressure: number;
  season: TireSeason;
  usage: BicycleUsage;

  getWarnings() {
    if (
      this.season === 'summer' &&
      this.getKm() >= 3_000 &&
      this.usage.getBikeType() === 'VTT'
    ) {
      return ['Changer le pneu'];
    }

    if (
      this.season === 'summer' &&
      this.getKm() >= 5_000 &&
      this.usage.getBikeType() === 'Road'
    ) {
      return ['Changer le pneu'];
    }

    if (this.season === 'winter' && this.getKm() >= 5_000) {
      return ['Changer le pneu'];
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
