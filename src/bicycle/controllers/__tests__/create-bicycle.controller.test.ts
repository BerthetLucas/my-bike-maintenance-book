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

  describe('when the payload contain a valid name', () => {
    it('should send a 201', async () => {
      expect(
        await createBicycleController.createBicycle({
          name: 'test',
          isMarked: true,
        }),
      );
    });
  });
});
