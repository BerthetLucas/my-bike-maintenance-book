import { Injectable } from '@nestjs/common';
import { SparePartRepository } from '../spare-part.repository';
import { NewSparePart } from '../models/new-spare-part.model';

@Injectable()
export class CreateSparePartUseCase {
  constructor(private readonly repository: SparePartRepository) {}

  async execute(newSparePart: NewSparePart): Promise<void> {
    await this.repository.create(newSparePart);
  }
}
