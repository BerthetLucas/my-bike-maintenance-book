import { Controller, Get } from '@nestjs/common';
import { BicycleMapper } from '../bicycle.mapper';
import { GetBicycleDto } from '../dto/get-bicycle.dto';
import { GetAllBicyclesUseCase } from '../usecases/get-all-bicycles.usecase';

@Controller('bicycles')
export class GetAllBicycleController {
  constructor(
    private readonly getAllBicyclesUseCase: GetAllBicyclesUseCase,
    private readonly bicyclemapper: BicycleMapper,
  ) {}

  @Get()
  async getAllBicycles(): Promise<GetBicycleDto[]> {
    const bicycles = await this.getAllBicyclesUseCase.execute();

    return bicycles.map((b) => this.bicyclemapper.toDto(b));
  }
}
