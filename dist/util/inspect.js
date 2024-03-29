"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getType = void 0;
const util_1 = require("util");

function getType(e) {
    return "object" == typeof e ? Array.isArray(e) ? "array" : Buffer.isBuffer(e) ? "buffer" : e instanceof RegExp ? "regexp" : e instanceof Date ? "date" : null === e ? "null" : void 0 === e ? "void" : (0, util_1.inspect)(e, {
        depth: -1
    })?.replace(/[\[\]]/g, "")?.toLowerCase() : typeof e
}
exports.getType = getType, exports.default = getType;