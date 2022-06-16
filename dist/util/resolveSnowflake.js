"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSnowflake = exports.isSnowflake = void 0;
function isSnowflake(snowflakeResolver) {
    const typeof_0 = typeof snowflakeResolver;
    if (!['number', 'string'].includes(typeof_0) || isNaN(snowflakeResolver))
        return false;
    typeof_0 === 'number' && (snowflakeResolver = snowflakeResolver.toString());
    return /\d{17,19}/.test(snowflakeResolver);
}
exports.isSnowflake = isSnowflake;
;
function resolveSnowflake(resolver) {
    const _0 = resolver.replace(/[<!@#:&a-z>]/gim, '');
    return isNaN(Number(_0)) && _0;
}
exports.resolveSnowflake = resolveSnowflake;
;
exports.default = {
    isSnowflake,
    resolveSnowflake
};
//# sourceMappingURL=resolveSnowflake.js.map