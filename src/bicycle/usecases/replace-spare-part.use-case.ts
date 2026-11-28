import { Injectable } from '@nestjs/common';
import { SparePart } from 'src/domain/spare-part/spare-part';
import { BicycleRepository } from '../bicycle.repository';

@Injectable()
export class ReplaceSparePartUseCase {
  constructor(private readonly repository: BicycleRepository) {}

  async execute(bicycleId: string, sparePartId: string, sparePart: SparePart) {
    const bicycle = await this.repository.getById(bicycleId);

    bicycle.replaceSparePart(sparePart, sparePartId);

    await this.repository.save(bicycle);
  }
}
