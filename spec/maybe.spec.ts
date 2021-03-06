import { nothing, MaybeKind, just, maybe } from "../src/index";

describe("Maybe", () => {
  describe("nothing", () => {
    it("should create nothing", () => {
      const maybe = nothing();
      expect(maybe.kind).toEqual(MaybeKind.Nothing);
      expect(maybe.isNothing()).toBeTruthy();
    });

    it("should map to nothing", () => {
      const maybe = nothing().map((_a: {}) => "Data");
      expect(maybe.isNothing()).toBeTruthy();
    });

    it("should andThen into nothing", () => {
      const maybe = nothing().andThen(_a => nothing());
      expect(maybe.kind).toEqual(MaybeKind.Nothing);
      expect(maybe.isJust()).toBeFalsy();
      expect(maybe.isNothing()).toBeTruthy();
    });

    it("should andThen into nothing given a just", () => {
      const data = "Data";
      const maybe = nothing().andThen(_a => just(data));
      expect(maybe.isJust()).toBeFalsy();
      expect(maybe.isNothing()).toBeTruthy();
      expect(maybe.kind).toEqual(MaybeKind.Nothing);
    });

    it("should withDefault with data", () => {
      const defaultData = "Default Data";
      const maybe = nothing();
      const output = maybe.withDefault(defaultData);
      expect(output).toEqual(defaultData);
    });

    it("should not do side effect", () => {
      const value = { counter: 0 };
      nothing().do(_ => {
        value.counter = value.counter + 1;
      });
      expect(value.counter).toEqual(0);
    });
  });

  describe("just", () => {
    it("should create just with data", () => {
      const data = "Data";
      const maybe = just(data);
      expect(maybe.kind).toEqual(MaybeKind.Just);
      expect(maybe.isNothing()).toBeFalsy();
      if (maybe.kind === MaybeKind.Just) {
        expect(maybe.value).toEqual(data);
      }
    });

    it("should map just to another type", () => {
      const data = "Data";
      const data2 = data.length;
      const maybe = just(data).map(a => a.length);

      expect(maybe.kind).toEqual(MaybeKind.Just);
      if (maybe.kind === MaybeKind.Just) {
        expect(maybe.value).toEqual(data2);
      }
    });

    it("should andThen to nothing", () => {
      const data = "Data";
      const maybe = just(data).andThen(_a => nothing());
      expect(maybe.kind).toEqual(MaybeKind.Nothing);
      expect(maybe.isJust()).toBeFalsy();
      expect(maybe.isNothing()).toBeTruthy();
    });

    it("should andThen just to just", () => {
      const data = "Data";
      const maybe = just(data).andThen(a => just(a.length));

      expect(maybe.kind).toEqual(MaybeKind.Just);
      expect(maybe.isJust()).toBeTruthy();
      expect(maybe.isNothing()).toBeFalsy();
      if (maybe.kind === MaybeKind.Just) {
        expect(maybe.value).toEqual(data.length);
      }
    });

    it("should withDefault with data", () => {
      const defaultData = "Default Data";
      const data = "Data";
      const maybe = just(data);
      const output = maybe.withDefault(defaultData);
      expect(output).toEqual(data);
    });

    it("should be nothing given a null", () => {
      const maybe = just(null);
      expect(maybe.isNothing()).toBeTruthy();
    });

    it("should do side effect", () => {
      const value = { counter: 0 };
      just("Something").do(_ => {
        value.counter = value.counter + 1;
      });
      expect(value.counter).toEqual(1);
    });
  });

  describe("maybe", () => {
    it("should return nothing given a null", () => {
      expect(maybe(null).isNothing()).toBeTruthy();
    });

    it("should return just given a value", () => {
      expect(maybe("Something").isJust()).toBeTruthy();
    });

    it("should be able to access .value after doing isJust checking", () => {
      const maybe = just(1);
      if (maybe.isJust()) {
        expect(maybe.value).toEqual(1);
      } else {
        fail("Should not be here");
      }
    });
  });
});
