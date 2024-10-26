import type { ErrorTrace } from 'src/types/errors';

class ResponseError extends Error {
  public readonly code: number = 0;

  public readonly name: string = '';

  public readonly message: string = '';

  public readonly details: string | null = null;

  public readonly trace: ErrorTrace[] | null = null;

  constructor(
    code: number,
    message: string,
    details: string | null = null,
    trace: ErrorTrace[] | null = null,
  ) {
    super(message);
    Object.setPrototypeOf(this, ResponseError.prototype);

    this.name = 'ResponseError';
    this.code = code;
    this.details = details;
    this.trace = trace;
  }
}

export default ResponseError;
