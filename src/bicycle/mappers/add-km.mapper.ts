import { AddKmDto } from '../dto/add-km.dto';

export class AddKmMapper {
  fromDto(dto: AddKmDto): number {
    return dto.km;
  }
}
