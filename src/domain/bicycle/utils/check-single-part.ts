import { Brake } from 'src/domain/spare-part/brake';
import { SparePart } from 'src/domain/spare-part/spare-part';
import { Tire } from 'src/domain/spare-part/tire';

export function checkSinglePart(
  currentSparePartList: SparePart[],
  spareParts: SparePart[],
) {
  const allMountedParts = [...currentSparePartList, ...spareParts];

  const allMountedPartsWithOnlySinglePart = allMountedParts.filter(
    (part) => !(part instanceof Brake || part instanceof Tire),
  );

  const allMountedPartsWithOnlySinglePartSet = new Set(
    allMountedPartsWithOnlySinglePart.map((part) => part.constructor),
  );

  if (
    allMountedPartsWithOnlySinglePartSet.size <
    allMountedPartsWithOnlySinglePart.length
  ) {
    throw new Error('A bicycle can only contain one unit of these parts');
  }
}
