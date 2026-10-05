import { Controller, Get } from '@nestjs/common';
import { BicycleModelMapper } from '../create-bicycle_model.mapper';

import { GetAllBicycleModelsUseCase } from '../usecases/get-all-bicycles_models.usecase';
import { BicycleModelResponseDto } from '../dto/get-bicycle-model.dto';

@Controller('bicycles-models')
export class GetAllBicycleModelController {
  constructor(
    private readonly usecase: GetAllBicycleModelsUseCase,
    private readonly mapper: BicycleModelMapper,
  ) {}

  @Get()
  async getAll(): Promise<BicycleModelResponseDto[]> {
    const models = await this.usecase.execute();

    const dtoModels = models.map((m) => this.mapper.toDto(m.model, m.brand));

    return dtoModels;
  }
}
