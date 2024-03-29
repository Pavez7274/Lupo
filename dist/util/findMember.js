"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.findMembers = exports.findMember = void 0;
const resolveSnowflake_1 = require("./resolveSnowflake");
async function findMember(e, s, r) {
    await e.members.fetch();
    let t = new RegExp(s, r ?? "gi");
    if ("" !== (s = s.toLowerCase().trim())) return (0, resolveSnowflake_1.isSnowflake)((0, resolveSnowflake_1.resolveSnowflake)(s)) ? e.members.cache.get((0, resolveSnowflake_1.resolveSnowflake)(s)) : e.members.cache.find(e => {
        var r = e.displayName + e.user.discriminator;
        return s === e.user.username.toLowerCase() || s === e.displayName || s === e.user.tag || s === r || t.test(e.displayName) || t.test(r) || t.test(e.user.tag) || s === e.toString() || (0, resolveSnowflake_1.resolveSnowflake)(s) === e.user.id
    })
}
async function findMembers(e, s, r = 1 / 0, t) {
    await e.members.fetch();
    let a = new RegExp(s, t ?? "gi");
    if ("" !== (s = s.toLowerCase().trim())) return e.members.cache.filter(e => {
        var r = e.displayName + e.user.discriminator;
        return s === e.user.username.toLowerCase() || s === e.displayName || s === e.user.tag || s === r || a.test(e.displayName) || a.test(r) || a.test(e.user.tag) || s === e.toString() || (0, resolveSnowflake_1.resolveSnowflake)(s) === e.user.id
    }).first(r)
}
exports.findMember = findMember, exports.findMembers = findMembers, exports.default = findMember;