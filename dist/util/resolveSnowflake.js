"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSnowflake = exports.isSnowflake = void 0;
function isSnowflake(resolvable) {
    const typeof_0 = typeof resolvable;
    if (!['number', 'string'].includes(typeof_0) || isNaN(resolvable))
        return false;
    typeof_0 === 'number' && (resolvable = resolvable.toString());
    return /\d{17,19}/.test(resolvable);
}
exports.isSnowflake = isSnowflake;
;
function resolveSnowflake(resolvable) {
    const _0 = resolvable.replace(/[<!@#:&a-z>]/gim, '');
    return isNaN(Number(_0)) && _0;
}
exports.resolveSnowflake = resolveSnowflake;
;
exports.default = {
    isSnowflake,
    resolveSnowflake
};
//# sourceMappingURL=resolveSnowflake.js.map