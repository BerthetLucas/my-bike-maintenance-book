import { Controller, Get } from '@nestjs/common';
import { BicycleMapper } from '../bicycle.mapper';
import { GetAllBicyclesUseCase } from '../usecases/get-all-bicycles.usecase';
import { BicycleResponseDto } from '../dto/get-bicycle.dto';

@Controller('bicycles')
export class GetAllBicycleController {
  constructor(
    private readonly getAllBicyclesUseCase: GetAllBicyclesUseCase,
    private readonly bicycleMapper: BicycleMapper,
  ) {}

  @Get()
  async getAllBicycles(): Promise<BicycleResponseDto[]> {
    const bicycles = await this.getAllBicyclesUseCase.execute();

    return bicycles.map((bicycle) => this.bicycleMapper.toDto(bicycle));
  }
}
