import { SparePart } from './spare-part';

export class Break extends SparePart {
  getWarnings(): string[] {
    return [];
  }
}
