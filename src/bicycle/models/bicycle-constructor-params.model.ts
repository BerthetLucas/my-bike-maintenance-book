import { BicycleModel } from '../../bicycle-model/models/bicycle-model.model';

export interface BicycleConstructorParams {
  id: string;
  name: string;
  isMarked: boolean;
  model: BicycleModel;
}
