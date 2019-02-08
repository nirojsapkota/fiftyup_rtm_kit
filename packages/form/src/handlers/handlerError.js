export class HandlerError extends Error {
  constructor(object, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HandlerError);
    }

    this.object = object;
  }
}
