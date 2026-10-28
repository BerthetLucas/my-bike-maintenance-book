import { SparePart } from './spare-part';

export class Chain extends SparePart {
  getWarnings(): string[] {
    if (this.getKm() > 3_000) {
      return ['Changer la chaine'];
    }
    return [];
  }
}
