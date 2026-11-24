import { Brake } from 'src/domain/spare-part/brake';
import { SparePart } from 'src/domain/spare-part/spare-part';
import { Tire } from 'src/domain/spare-part/tire';

export function checkDuplicatedParts(
  currentSparePartList: SparePart[],
  spareParts: SparePart[],
) {
  const allMountedParts = [...currentSparePartList, ...spareParts];

  if (allMountedParts.filter((part) => part instanceof Tire).length > 2) {
    throw new Error("A bicycle can't have more than two tires");
  }

  if (allMountedParts.filter((part) => part instanceof Brake).length > 2) {
    throw new Error("A bicycle can't have more than two brakes");
  }
}
