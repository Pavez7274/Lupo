"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMember = void 0;
const resolveSnowflake_1 = require("./resolveSnowflake");
async function findMember(guild, resolver, tags) {
    await guild.members.fetch();
    let reg = new RegExp(resolver, tags ?? 'gi');
    resolver = resolver.toLowerCase();
    if ((0, resolveSnowflake_1.isSnowflake)(resolver)) {
        return guild.members.cache.get(resolver);
    }
    ;
    return guild.members.cache.find((member) => {
        let displayTag = member.displayName + member.user.discriminator;
        return resolver === member.user.username.toLowerCase() ||
            resolver === member.displayName ||
            resolver === member.user.tag ||
            resolver === displayTag ||
            reg.test(member.displayName) ||
            reg.test(displayTag) ||
            reg.test(member.user.tag) ||
            resolver === member.toString() ||
            (0, resolveSnowflake_1.resolveSnowflake)(resolver) === member.user.id;
    });
}
exports.findMember = findMember;
;
exports.default = {
    findMember
};
//# sourceMappingURL=findMember.js.map