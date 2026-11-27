import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';

@Injectable()
export class AddKmUseCase {
  constructor(private readonly repository: BicycleRepository) {}

  async execute(km: number, bicycleId: string): Promise<void> {
    const bicycle = await this.repository.getById(bicycleId);
    bicycle.addKm(km);

    await this.repository.save(bicycle);
  }
}
