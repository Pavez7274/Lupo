"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getType = void 0;
const util_1 = require("util");
function getType(value) {
    if (typeof value === 'object') {
        if (Array.isArray(value))
            return 'array';
        else if (Buffer.isBuffer(value))
            return 'buffer';
        else if (value instanceof RegExp)
            return 'regexp';
        else if (value instanceof Date)
            return 'date';
        else if (value === null)
            return 'null';
        else if (value === void 0)
            return 'void';
        else
            return (0, util_1.inspect)(value, { depth: -1 })?.replace(/[\[\]]/g, '')?.toLowerCase();
    }
    ;
    return typeof value;
}
exports.getType = getType;
;
exports.default = getType;
//# sourceMappingURL=inspect.js.map