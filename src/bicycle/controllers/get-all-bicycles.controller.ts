import { Controller, Get } from '@nestjs/common';
import { GetAllBicyclesUseCase } from '../usecases/get-all-bicycles.usecase';
import { BicycleListItemResponseDto } from '../dto/bicycle-list-item-response.dto';
import { BicycleListItemMapper } from '../mappers/bicycle-list-item.mapper';

@Controller('bicycles')
export class GetAllBicycleController {
  constructor(
    private readonly getAllBicyclesUseCase: GetAllBicyclesUseCase,
    private readonly bicycleMapper: BicycleListItemMapper,
  ) {}

  @Get()
  async getAllBicycles(): Promise<BicycleListItemResponseDto[]> {
    const bicycles = await this.getAllBicyclesUseCase.execute();

    return bicycles.map((bicycle) => this.bicycleMapper.toDto(bicycle));
  }
}
