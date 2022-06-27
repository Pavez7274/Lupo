"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = void 0;
const resolveSnowflake_1 = require("./resolveSnowflake");
async function findUser(client, resolvable, tags) {
    resolvable = resolvable.toLowerCase();
    if ((0, resolveSnowflake_1.isSnowflake)(resolvable)) {
        return await client.users.fetch(resolvable).catch(() => void 0);
    }
    ;
    let reg = new RegExp(resolvable, tags ?? 'gi');
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
exports.default = findUser;
//# sourceMappingURL=findUser.js.map