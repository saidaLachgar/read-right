export type ValidationErrorItem = {
  code: number,
  message: string,
};

export type ValidationErrors = Record<string, ValidationErrorItem>;

export type ImportFileError = {
  id: number,
  code: string,
  message: string
};

export type ErrorTrace = {
  namespace: string,
  short_class: string,
  class: string,
  type: string,
  function: string,
  file: string,
  line: number,
  args: string[][],
};

export type RawResponseError = {
  '@context': string,
  '@type': string,
  'hydra:title': string,
  'hydra:description': string,
  trace?: ErrorTrace[],
};
