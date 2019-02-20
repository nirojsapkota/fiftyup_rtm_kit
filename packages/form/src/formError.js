export class FormError extends Error {
  constructor(object, ...params) {
    super(...params);

    this.object = object;
  }
}
