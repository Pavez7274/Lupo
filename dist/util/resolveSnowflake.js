"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSnowflake = exports.isSnowflake = void 0;
function isSnowflake(resolvable) {
    const typeof_0 = typeof resolvable;
    if (!['number', 'string'].includes(typeof_0) || isNaN(resolvable))
        return false;
    typeof_0 === 'number' && (resolvable = resolvable.toString());
    return /\d{17,20}/.test(resolvable);
}
exports.isSnowflake = isSnowflake;
;
function resolveSnowflake(resolvable) {
    resolvable = resolvable.replace(/[&#@!:<>]/gim, '');
    return !!Number(resolvable) && resolvable;
}
exports.resolveSnowflake = resolveSnowflake;
;
exports.default = {
    isSnowflake,
    resolveSnowflake
};
//# sourceMappingURL=resolveSnowflake.js.map