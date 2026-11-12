export class StrapiRequestError extends Error {
  readonly publicMessage: string;

  constructor(status: number, publicMessage: string) {
    super(`Strapi ${status}: ${publicMessage}`);
    this.name = StrapiRequestError.name;
    this.publicMessage = publicMessage;
  }
}
