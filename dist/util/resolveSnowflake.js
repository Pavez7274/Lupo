"use strict";

function isSnowflake(e) {
    var o = typeof e;
    return !(!["number", "string"].includes(o) || isNaN(e)) && ("number" == o && (e = e.toString()), /\d{17,19}/.test(e))
}

function resolveSnowflake(e) {
    return e = e.replace(/[<!@#:&a-z>]/gim, ""), isNaN(Number(e)) && e
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.resolveSnowflake = exports.isSnowflake = void 0, exports.isSnowflake = isSnowflake, exports.resolveSnowflake = resolveSnowflake, exports.default = {
    isSnowflake: isSnowflake,
    resolveSnowflake: resolveSnowflake
};