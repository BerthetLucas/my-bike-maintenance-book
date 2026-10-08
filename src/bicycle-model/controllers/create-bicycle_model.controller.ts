import { Body, Controller, Post } from '@nestjs/common';
import { CreateBicycleModelDto } from '../dto/create-bicycle-model.dto';
import { CreateBicycleModelUseCase } from '../usecases/create-bicycle_model-usecase';
import { CreateBicycleModelMapper } from '../create-bicycle-model.mapper';

@Controller('bicycles-models')
export class CreateBicycleModelController {
  constructor(
    private readonly usecase: CreateBicycleModelUseCase,
    private readonly mapper: CreateBicycleModelMapper,
  ) {}

  @Post()
  async createBicycleModel(
    @Body() modelDto: CreateBicycleModelDto,
  ): Promise<void> {
    const newModel = this.mapper.fromDto(modelDto);

    return this.usecase.execute(newModel);
  }
}
