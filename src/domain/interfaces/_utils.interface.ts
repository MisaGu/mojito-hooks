export type Compare<A extends AnyObject, B extends DeepPartialAny<A>> = {
  [K in keyof A]: B[K] extends A[K] ? '' : K;
};

type Entry = { key: string; value: any; optional: boolean };

type Explode<T> = _Explode<T extends readonly any[] ? { '0': T[number] } : T>;

type _Explode<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? Explode<T[K]> extends infer E
          ? E extends Entry
            ? {
                key: `${K}${E['key'] extends '' ? '' : '.'}${E['key']}`;
                value: E['value'];
                optional: E['key'] extends ''
                  ? {} extends Pick<T, K>
                    ? true
                    : false
                  : E['optional'];
              }
            : never
          : never
        : never;
    }[keyof T]
  : { key: ''; value: T; optional: false };

type Collapse<T extends Entry> = {
  [E in Extract<T, { optional: false }> as E['key']]: E['value'];
} & Partial<{ [E in Extract<T, { optional: true }> as E['key']]: E['value'] }> extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

type Flatten<T> = Collapse<Explode<T>>;

/** Makes each property optional and turns each leaf property into any, allowing for type overrides by narrowing any. */
type DeepPartialAny<T> = {
  [P in keyof T]?: T[P] extends AnyObject ? DeepPartialAny<T[P]> : any;
};

type AnyObject = Record<string, any>;

export type Combine<A, B> = Omit<A, keyof B> & B;

export type DeepCompare<A, B, R = B> = [Required<Flatten<A>>, Required<Flatten<B>>] extends infer P
  ? P extends any[]
    ?
        | Exclude<Compare<P[0], P[1]>[keyof Compare<P[0], P[1]>], true>
        | Exclude<Compare<P[1], P[0]>[keyof Compare<P[1], P[0]>], true> extends infer O
      ? O extends ''
        ? R
        : O
      : unknown
    : unknown
  : unknown;

type t0 = { a: [1, 2]; b: number };
type t1 = { a: [1, 3]; b: number };

type r = DeepCompare<t0, t1>;
