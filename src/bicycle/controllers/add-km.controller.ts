import { Body, Controller, Param, Post } from '@nestjs/common';
import { BicycleRequestDto } from '../dto/bicycle-request.dto';
import { AddKmDto } from '../dto/add-km.dto';
import { AddKmMapper } from '../mappers/add-km.mapper';
import { AddKmUseCase } from '../usecases/add-km.usecase';

@Controller('bicycles')
export class AddKmController {
  constructor(
    private readonly mapper: AddKmMapper,
    private readonly usecase: AddKmUseCase,
  ) {}

  @Post(':id/add-km')
  async addKm(@Param() { id }: BicycleRequestDto, @Body() addKmDto: AddKmDto) {
    const kmToAdd = this.mapper.fromDto(addKmDto);

    await this.usecase.execute(kmToAdd, id);
  }
}
