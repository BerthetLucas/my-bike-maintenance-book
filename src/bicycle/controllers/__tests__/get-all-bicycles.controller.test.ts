import { CreateBicycleUseCase } from 'src/bicycle/usecases/create-bicycle.usecase';
import { CreateBicycleController } from '../create-bicycle.controller';
import { Test } from '@nestjs/testing';
import { CreateBicycleMapper } from 'src/bicycle/bicycle.mapper';

describe('CreateBicycleController', () => {
  let createBicycleController: CreateBicycleController;
  let createBicycleUseCase: CreateBicycleUseCase;
  let createBicycleMapper: CreateBicycleMapper;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CreateBicycleController],
      providers: [CreateBicycleUseCase, CreateBicycleMapper],
    }).compile();

    createBicycleController = module.get(CreateBicycleController);
    createBicycleUseCase = module.get(CreateBicycleUseCase);
    createBicycleMapper = module.get(CreateBicycleMapper);
  });

  describe('when find all method is called', () => {
    it('should return a list of bicycles', async () => {
      const result = [{ id: 'my-first-id', name: 'Test', isMarked: true }];
    });
  });
});
