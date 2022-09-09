"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsers = exports.findUser = void 0;
const resolveSnowflake_1 = require("./resolveSnowflake");
async function findUser(client, resolvable, flags) {
    resolvable = resolvable.toLowerCase().trim();
    if (resolvable === '')
        return;
    if ((0, resolveSnowflake_1.isSnowflake)((0, resolveSnowflake_1.resolveSnowflake)(resolvable))) {
        return await client.users.fetch((0, resolveSnowflake_1.resolveSnowflake)(resolvable)).catch(() => void 0);
    }
    ;
    let reg = new RegExp(resolvable, flags ?? 'gi');
    return client.users.cache.find((user) => {
        return resolvable === user.username.toLowerCase() ||
            resolvable === user.tag ||
            reg.test(user.username) ||
            reg.test(user.tag) ||
            resolvable === user.toString() ||
            (0, resolveSnowflake_1.resolveSnowflake)(resolvable) === user.id;
    });
}
exports.findUser = findUser;
;
async function findUsers(client, resolvable, limit = Infinity, flags) {
    resolvable = resolvable.toLowerCase().trim();
    if (resolvable === '')
        return;
    let reg = new RegExp(resolvable, flags ?? 'gi');
    return client.users.cache.filter((user) => {
        return resolvable === user.username.toLowerCase() ||
            resolvable === user.tag ||
            reg.test(user.username) ||
            reg.test(user.tag) ||
            resolvable === user.toString() ||
            (0, resolveSnowflake_1.resolveSnowflake)(resolvable) === user.id;
    }).first(limit);
}
exports.findUsers = findUsers;
;
exports.default = findUser;
//# sourceMappingURL=findUser.js.map