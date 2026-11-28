export class SparePartReplacementInconsistencyError extends Error {
  constructor(message: string) {
    super(`SparePartReplacementInconsistencyError : ${message}`);
  }
}
