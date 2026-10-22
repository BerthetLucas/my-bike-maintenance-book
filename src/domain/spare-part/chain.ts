import { SparePart } from './spare-part';

export class Chain extends SparePart {
  getWarnings(): string[] {
    if (this.getKm() > 500) {
      return ['Changer la chaine'];
    }
    return [];
  }
}
