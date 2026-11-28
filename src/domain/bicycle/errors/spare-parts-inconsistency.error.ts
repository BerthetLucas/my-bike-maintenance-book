export class SparePartsInconsistencyError extends Error {
  constructor(message: string) {
    super(`SparePartsInconsistencyError : ${message}`);
  }
}
