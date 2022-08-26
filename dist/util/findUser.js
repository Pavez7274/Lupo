"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.findUsers = exports.findUser = void 0;
const resolveSnowflake_1 = require("./resolveSnowflake");
async function findUser(e, r, o) {
    if ("" !== (r = r.toLowerCase().trim())) {
        if ((0, resolveSnowflake_1.isSnowflake)((0, resolveSnowflake_1.resolveSnowflake)(r))) return e.users.fetch((0, resolveSnowflake_1.resolveSnowflake)(r)).catch(() => {});
        let s = new RegExp(r, o ?? "gi");
        return e.users.cache.find(e => r === e.username.toLowerCase() || r === e.tag || s.test(e.username) || s.test(e.tag) || r === e.toString() || (0, resolveSnowflake_1.resolveSnowflake)(r) === e.id)
    }
}
async function findUsers(e, r, o = 1 / 0, t) {
    if ("" !== (r = r.toLowerCase().trim())) {
        let s = new RegExp(r, t ?? "gi");
        return e.users.cache.filter(e => r === e.username.toLowerCase() || r === e.tag || s.test(e.username) || s.test(e.tag) || r === e.toString() || (0, resolveSnowflake_1.resolveSnowflake)(r) === e.id).first(o)
    }
}
exports.findUser = findUser, exports.findUsers = findUsers, exports.default = findUser;