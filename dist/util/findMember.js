"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMembers = exports.findMember = void 0;
const resolveSnowflake_1 = require("./resolveSnowflake");
async function findMember(guild, resolvable, flags) {
    await guild.members.fetch();
    let reg = new RegExp(resolvable, flags ?? 'gi');
    resolvable = resolvable.toLowerCase().trim();
    if (resolvable === '')
        return;
    if ((0, resolveSnowflake_1.isSnowflake)((0, resolveSnowflake_1.resolveSnowflake)(resolvable))) {
        return guild.members.cache.get((0, resolveSnowflake_1.resolveSnowflake)(resolvable));
    }
    ;
    return guild.members.cache.find((member) => {
        let displayTag = member.displayName + member.user.discriminator;
        return resolvable === member.user.username.toLowerCase() ||
            resolvable === member.displayName ||
            resolvable === member.user.tag ||
            resolvable === displayTag ||
            reg.test(member.displayName) ||
            reg.test(displayTag) ||
            reg.test(member.user.tag) ||
            resolvable === member.toString() ||
            (0, resolveSnowflake_1.resolveSnowflake)(resolvable) === member.user.id;
    });
}
exports.findMember = findMember;
;
async function findMembers(guild, resolvable, limit = Infinity, flags) {
    await guild.members.fetch();
    let reg = new RegExp(resolvable, flags ?? 'gi');
    resolvable = resolvable.toLowerCase().trim();
    if (resolvable === '')
        return;
    return guild.members.cache.filter((member) => {
        let displayTag = member.displayName + member.user.discriminator;
        return resolvable === member.user.username.toLowerCase() ||
            resolvable === member.displayName ||
            resolvable === member.user.tag ||
            resolvable === displayTag ||
            reg.test(member.displayName) ||
            reg.test(displayTag) ||
            reg.test(member.user.tag) ||
            resolvable === member.toString() ||
            (0, resolveSnowflake_1.resolveSnowflake)(resolvable) === member.user.id;
    }).first(limit);
}
exports.findMembers = findMembers;
;
exports.default = findMember;
//# sourceMappingURL=findMember.js.map