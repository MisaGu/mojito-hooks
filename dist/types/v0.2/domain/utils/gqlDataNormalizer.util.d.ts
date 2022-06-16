import * as Schema from '../interfaces/mojito-schema.interface';
export declare function mojitoNormalizer(
  raw_response: Schema.Query,
  variables?: {
    slug?: string;
  },
  key?: any,
): Promise<{} | null>;
export declare function contentfulNormalizer(
  response: any,
  variables?: {
    slug?: string;
    mojitoId?: string;
  },
  key?: any,
): any;
