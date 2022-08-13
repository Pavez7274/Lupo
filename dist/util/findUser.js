"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.findUsers = exports.findUser = void 0;
const resolveSnowflake_1 = require("./resolveSnowflake");
async function findUser(e, s, r) {
    if (s = s.toLowerCase(), (0, resolveSnowflake_1.isSnowflake)(s)) return e.users.fetch(s).catch(() => {});
    let t = new RegExp(s, r ?? "gi");
    return e.users.cache.find(e => s === e.username.toLowerCase() || s === e.tag || t.test(e.username) || t.test(e.tag) || s === e.toString() || (0, resolveSnowflake_1.resolveSnowflake)(s) === e.id)
}
async function findUsers(e, s, r = 1 / 0, t) {
    s = s.toLowerCase();
    let n = new RegExp(s, t ?? "gi");
    return e.users.cache.filter(e => s === e.username.toLowerCase() || s === e.tag || n.test(e.username) || n.test(e.tag) || s === e.toString() || (0, resolveSnowflake_1.resolveSnowflake)(s) === e.id).first(r)
}
exports.findUser = findUser, exports.findUsers = findUsers, exports.default = findUser;