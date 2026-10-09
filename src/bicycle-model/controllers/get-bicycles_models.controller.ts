import { Controller, Get } from '@nestjs/common';
import { BicycleModelMapper } from '../create-bicycle-model.mapper';

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

    return models.map((model) => this.mapper.toDto(model));
  }
}
