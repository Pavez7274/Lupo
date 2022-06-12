"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
function default_1(value) {
    if (typeof value === 'object') {
        if (Array.isArray(value))
            return 'array';
        else if (Buffer.isBuffer(value))
            return 'buffer';
        else if (value instanceof RegExp)
            return 'RegExp';
        else if (value instanceof Date)
            return 'date';
        else if (value === null)
            return 'null';
        else if (value === void 0)
            return 'void';
        else
            return (0, util_1.inspect)(value, { depth: -1 });
    }
    ;
    return typeof value;
}
exports.default = default_1;
;
//# sourceMappingURL=inspect.js.map