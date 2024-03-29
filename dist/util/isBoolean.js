"use strict";

function isBoolean(e) {
    return ["false", "true", "yes", "no", "1", "0"].includes(e)
}

function parse(e) {
    let s = !1;
    switch (e) {
        case "yes":
            s = !0;
            break;
        case "no":
            s = !1;
            break;
        case "true":
        case "1":
            s = !0;
            break;
        case "0":
            s = !1
    }
    return s
}
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parse = exports.isBoolean = void 0, exports.isBoolean = isBoolean, exports.parse = parse, exports.default = {
    isBoolean: isBoolean,
    parse: parse
};