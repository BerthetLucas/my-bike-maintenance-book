import { Controller, Get, Param } from '@nestjs/common';
import { BicycleModelMapper } from '../create-bicycle_model.mapper';
import {
  BicycleModelDto,
  GetBicycleModelByIdRequestDto,
} from '../dto/get-bicycle-model.dto';
import { GetOneBicycleModelsUseCase } from '../usecases/get-bicycle_model.usecase';

@Controller('bicycles-models')
export class GetOneBicycleModelController {
  constructor(
    private readonly usecase: GetOneBicycleModelsUseCase,
    private readonly mapper: BicycleModelMapper,
  ) {}

  @Get(':id')
  async getOne(
    @Param() requestModel: GetBicycleModelByIdRequestDto,
  ): Promise<BicycleModelDto> {
    const model = await this.usecase.execute(requestModel);

    return this.mapper.toDto(model);
  }
}
