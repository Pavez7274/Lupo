"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = void 0;
const resolveSnowflake_1 = require("./resolveSnowflake");
async function findUser(client, userToSolve, tags) {
    userToSolve = userToSolve.toLowerCase();
    if ((0, resolveSnowflake_1.isSnowflake)(userToSolve)) {
        return await client.users.fetch(userToSolve).catch(() => void 0);
    }
    ;
    let reg = new RegExp(userToSolve, tags ?? 'gi');
    return client.users.cache.find((user) => {
        return userToSolve === user.username.toLowerCase() ||
            userToSolve === user.tag ||
            reg.test(user.username) ||
            reg.test(user.tag) ||
            userToSolve === user.toString() ||
            (0, resolveSnowflake_1.resolveSnowflake)(userToSolve) === user.id;
    });
}
exports.findUser = findUser;
;
exports.default = {
    findUser
};
//# sourceMappingURL=findUser.js.map