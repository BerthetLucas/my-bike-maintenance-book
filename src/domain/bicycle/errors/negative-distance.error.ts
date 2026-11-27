export class NegativeDistanceError extends Error {
  constructor(message: string) {
    super(`NegativeDistanceError : ${message}`);
  }
}
