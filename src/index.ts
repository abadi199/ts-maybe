export enum MaybeKind {
  Nothing = 1,
  Just = 2
}

export interface IMaybe<data> {
  kind: MaybeKind;
  isNothing(): boolean;
  isJust(): boolean;
  map<b>(f: (payload: data) => b): Maybe<b>;
  andThen<b>(f: (payload: data) => Maybe<b>): Maybe<b>;
  withDefault(payload: data): data;
}

export class Nothing<data> implements IMaybe<data> {
  readonly kind = MaybeKind.Nothing;
  isNothing() {
    return true;
  }
  isJust() {
    return !this.isNothing();
  }
  map<b>(_f: (payload: data) => b): Maybe<b> {
    return new Nothing<b>();
  }
  andThen<b>(_f: (payload: data) => Maybe<b>): Maybe<b> {
    return new Nothing<b>();
  }
  withDefault(payload: data): data {
    return payload;
  }
}

export function nothing<data>(): Maybe<data> {
  return new Nothing<data>();
}

export class Just<data> implements IMaybe<data> {
  readonly kind = MaybeKind.Just;
  isNothing() {
    return false;
  }
  isJust() {
    return !this.isNothing();
  }
  map<b>(f: (payload: data) => b): Maybe<b> {
    return just(f(this.value));
  }
  andThen<b>(f: (payload: data) => Maybe<b>): Maybe<b> {
    return f(this.value);
  }
  withDefault(_payload: data): data {
    return this.value;
  }

  constructor(public value: data) {}
}

export function just<data>(value: data): Maybe<data> {
  return new Just(value);
}

export type Maybe<data> = Nothing<data> | Just<data>;
