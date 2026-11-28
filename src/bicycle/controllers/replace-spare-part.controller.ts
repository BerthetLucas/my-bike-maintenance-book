import { Body, Controller, Param, Put } from '@nestjs/common';
import { BicycleRequestDto } from '../dto/bicycle-request.dto';
import { ReplaceSparePartUseCase } from '../usecases/replace-spare-part.use-case';
import { ReplaceSparePartDto } from '../dto/replace-spare-part.dto';
import { ReplaceSparePartMapper } from '../mappers/replace-spare-part.mapper';
import { SparePartRequestDto } from '../dto/spare-part-request.dto';

@Controller('bicycles')
export class ReplaceSparePartController {
  constructor(
    private readonly usecase: ReplaceSparePartUseCase,
    private readonly mapper: ReplaceSparePartMapper,
  ) {}

  @Put(':id/spare-parts/:sparePartId')
  async replace(
    @Param() { id: bicycleId }: BicycleRequestDto,
    @Param() { sparePartId }: SparePartRequestDto,
    @Body() sparePartDto: ReplaceSparePartDto,
  ): Promise<void> {
    const sparePart = this.mapper.fromDto(sparePartDto);

    await this.usecase.execute(bicycleId, sparePartId, sparePart);
  }
}
