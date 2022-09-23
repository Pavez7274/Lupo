"use strict";

function random(o, r = 0, e = !1) {
    return e ? Math.random() * (o - r) + r : Math.floor(Math.random() * (o - r) + r)
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.random = void 0, exports.random = random, exports.default = random;