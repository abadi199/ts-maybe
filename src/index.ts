export enum MaybeKind {
  Nothing = 1,
  Just = 2
}

export interface IMaybe<data> {
  kind: MaybeKind;
  isNothing(): this is Nothing<data>;
  isJust(): this is Just<data>;
  map<b>(f: (payload: data) => b): Maybe<b>;
  andThen<b>(f: (payload: data) => Maybe<b>): Maybe<b>;
  withDefault(payload: data): data;
  do(f: (payload: data) => void): Maybe<data>;
}

export class Nothing<data> implements IMaybe<data> {
  readonly kind = MaybeKind.Nothing;
  isNothing(): this is Nothing<data> {
    return true;
  }
  isJust(): this is Just<data> {
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
  do(_f: (payload: data) => void): Maybe<data> {
    return this;
  }
}

export function nothing<data>(): Maybe<data> {
  return new Nothing<data>();
}

export class Just<data> implements IMaybe<data> {
  readonly kind = MaybeKind.Just;
  isNothing(): this is Nothing<data> {
    return false;
  }
  isJust(): this is Just<data> {
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
  do(f: (payload: data) => void): Maybe<data> {
    if (this.value) {
      f(this.value);
    }
    return this;
  }

  constructor(public value: data) {}
}

export function just<data>(value: data): Maybe<data> {
  return value ? new Just(value) : nothing();
}

export function maybe<data>(value: data): Maybe<data> {
  return just(value);
}

export type Maybe<data> = Nothing<data> | Just<data>;
