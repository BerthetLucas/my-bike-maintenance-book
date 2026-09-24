import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateBicycleUseCase {
  constructor() {}
  execute() {
    console.log('create bicycle usecase');
  }
}
