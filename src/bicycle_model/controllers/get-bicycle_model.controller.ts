import { Controller, Get, Param } from '@nestjs/common';
import { BicycleModelMapper } from '../create-bicycle_model.mapper';
import {
  BicycleModelRequestDto,
  BicycleModelResponseDto,
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
    @Param() requestModel: BicycleModelRequestDto,
  ): Promise<BicycleModelResponseDto> {
    const id = this.mapper.fromDto(requestModel);

    const { model, brand } = await this.usecase.execute(id);

    return this.mapper.toDto(model, brand);
  }
}
