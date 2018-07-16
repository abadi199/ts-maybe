"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MaybeKind;
(function (MaybeKind) {
    MaybeKind[MaybeKind["Nothing"] = 1] = "Nothing";
    MaybeKind[MaybeKind["Just"] = 2] = "Just";
})(MaybeKind = exports.MaybeKind || (exports.MaybeKind = {}));
var Nothing = /** @class */ (function () {
    function Nothing() {
        this.kind = MaybeKind.Nothing;
    }
    Nothing.prototype.isNothing = function () {
        return true;
    };
    Nothing.prototype.isJust = function () {
        return !this.isNothing();
    };
    Nothing.prototype.map = function (_f) {
        return new Nothing();
    };
    Nothing.prototype.andThen = function (_f) {
        return new Nothing();
    };
    Nothing.prototype.withDefault = function (payload) {
        return payload;
    };
    return Nothing;
}());
exports.Nothing = Nothing;
function nothing() {
    return new Nothing();
}
exports.nothing = nothing;
var Just = /** @class */ (function () {
    function Just(value) {
        this.value = value;
        this.kind = MaybeKind.Just;
    }
    Just.prototype.isNothing = function () {
        return false;
    };
    Just.prototype.isJust = function () {
        return !this.isNothing();
    };
    Just.prototype.map = function (f) {
        return just(f(this.value));
    };
    Just.prototype.andThen = function (f) {
        return f(this.value);
    };
    Just.prototype.withDefault = function (_payload) {
        return this.value;
    };
    return Just;
}());
exports.Just = Just;
function just(value) {
    return new Just(value);
}
exports.just = just;
