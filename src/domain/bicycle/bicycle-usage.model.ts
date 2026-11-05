export type Usage = 'VTT' | 'Road';

interface BicycleUsageConstructorParams {
  bikeUsage: Usage;
}

export class BicycleUsage {
  bikeUsage: Usage;

  constructor({ bikeUsage }: BicycleUsageConstructorParams) {
    this.bikeUsage = bikeUsage;
  }

  getBikeType(): Usage {
    return this.bikeUsage;
  }
}
