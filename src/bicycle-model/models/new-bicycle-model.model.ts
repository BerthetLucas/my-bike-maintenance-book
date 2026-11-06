import { Usage } from 'src/domain/bicycle/bicycle-usage';

export interface NewBicycleModel {
  name: string;
  brandId: string;
  usage: Usage;
}
