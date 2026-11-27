import { Injectable } from '@nestjs/common';
import { BicycleRepository } from '../bicycle.repository';
import { SparePart } from 'src/domain/spare-part/spare-part';

@Injectable()
export class MountSparePartUseCase {
  constructor(private readonly bicycleRepository: BicycleRepository) {}

  async execute(bicycleId: string, spareParts: SparePart[]): Promise<void> {
    const bicycle = await this.bicycleRepository.getById(bicycleId);

    bicycle.mountSparePart(spareParts);

    await this.bicycleRepository.save(bicycle);
  }
}
