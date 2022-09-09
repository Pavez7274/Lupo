"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = void 0;
function noop(type = 'void') {
    if (type == 'void')
        return;
    return type == 'null'
        ? null
        : type == 'undefined'
            ? void 0
            : type == 'number'
                ? 0
                : type == 'boolean' && false;
}
exports.noop = noop;
;
__exportStar(require("./generateCommandDoc"), exports);
__exportStar(require("./resolveSnowflake"), exports);
__exportStar(require("./findMember"), exports);
__exportStar(require("./isBoolean"), exports);
__exportStar(require("./paginator"), exports);
__exportStar(require("./findUser"), exports);
__exportStar(require("./inspect"), exports);
__exportStar(require("./random"), exports);
__exportStar(require("./reboot"), exports);
//# sourceMappingURL=index.js.map