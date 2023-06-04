export class CartDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartDomainException';
    Object.setPrototypeOf(this, CartDomainException.prototype);
  }
}