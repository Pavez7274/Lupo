"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMember = void 0;
const resolveSnowflake_1 = require("./resolveSnowflake");
async function findMember(guild, resolvable, tags) {
    await guild.members.fetch();
    let reg = new RegExp(resolvable, tags ?? 'gi');
    resolvable = resolvable.toLowerCase();
    if ((0, resolveSnowflake_1.isSnowflake)(resolvable)) {
        return guild.members.cache.get(resolvable);
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
exports.default = findMember;
//# sourceMappingURL=findMember.js.map