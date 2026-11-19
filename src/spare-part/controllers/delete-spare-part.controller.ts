import { Controller, Param, Put } from '@nestjs/common';
import { DeleteSparePartUseCase } from '../usecases/delete-spare-part.usecase';

@Controller('spare-parts')
export class DeleteSparePartController {
  constructor(private readonly usecase: DeleteSparePartUseCase) {}

  @Put(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.usecase.execute(id);
  }
}
