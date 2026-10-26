import { BicycleUsecase } from '../bicycle/bicycle-usecase.model';
import { SpareConstructorParams, SparePart } from './spare-part';

type TireSeason = 'winter' | 'summer';

interface TireConstructorParams extends SpareConstructorParams {
  recommendedPressure: number;
  season: TireSeason;
  usecase: BicycleUsecase;
}

export class Tire extends SparePart {
  recommendedPressure: number;
  season: TireSeason;
  usecase: BicycleUsecase;

  getWarnings() {
    if (this.season === 'summer' && this.getKm() >= 5_000) {
      return ['Changer le pneu'];
    }

    if (this.season === 'winter' && this.getKm() >= 8_000) {
      return ['Changer le pneu'];
    }

    return [];
  }

  constructor({
    recommendedPressure,
    season,
    usecase,
    ...parent
  }: TireConstructorParams) {
    super(parent);
    this.recommendedPressure = recommendedPressure;
    this.season = season;
    this.usecase = usecase;
  }
}
