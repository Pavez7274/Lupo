"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.type = exports.name = void 0;
exports.name = 'messageCreate';
exports.type = 'dsc';
async function run(lappy, msg) {
    if (!lappy ||
        msg.author.bot ||
        !msg.guild ||
        !msg.channel)
        return;
    const { channel, guild, member, author } = msg;
    const me = await msg.guild.members.fetch(lappy?.user?.id);
    if (me.permissionsIn(channel).has(1 << 11))
        return;
}
exports.run = run;
;
//# sourceMappingURL=msg.js.map