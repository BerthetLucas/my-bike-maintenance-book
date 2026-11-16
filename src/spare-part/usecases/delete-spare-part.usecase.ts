import { Injectable } from '@nestjs/common';
import { SparePartRepository } from '../spare-part.repository';

@Injectable()
export class DeleteSparePartUseCase {
  constructor(private readonly repository: SparePartRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
