import { Body, Controller, Param, Put } from '@nestjs/common';
import { DeleteSparePartUseCase } from '../usecases/delete-spare-part.usecase';

@Controller('spare-parts')
export class DeleteSparePartController {
  constructor(private readonly usecase: DeleteSparePartUseCase) {}

  @Put()
  async delete(@Param() id: string): Promise<void> {
    await this.usecase.execute(id);
  }
}
