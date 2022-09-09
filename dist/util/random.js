"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
function random(max, min = 0, decimals = false) {
    return decimals
        ? Math.random() * (max - min) + min
        : Math.floor(Math.random() * (max - min) + min);
}
exports.random = random;
;
exports.default = random;
//# sourceMappingURL=random.js.map