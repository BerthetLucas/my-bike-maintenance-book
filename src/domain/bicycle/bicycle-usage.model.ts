export type Usage = 'VTT' | 'Road';

interface BicycleUsageConstructorParams {
  bikeUsage: Usage;
}

export class BicycleUsage {
  bikeUsage: Usage;
  static ROAD = new BicycleUsage({ bikeUsage: 'Road' });
  static VTT = new BicycleUsage({ bikeUsage: 'VTT' });

  constructor({ bikeUsage }: BicycleUsageConstructorParams) {
    this.bikeUsage = bikeUsage;
  }

  getBikeType(): Usage {
    return this.bikeUsage;
  }
}
