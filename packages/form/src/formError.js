export class FormError extends Error {
  constructor(object, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FormError);
    }

    this.object = object;
  }
}
