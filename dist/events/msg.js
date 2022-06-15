"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.type = exports.name = void 0;
const Arguments_1 = require("../structures/Arguments");
;
;
exports.name = 'messageCreate';
exports.type = 'dsc';
async function run(lappy, msg) {
    if (msg.author.bot || !msg.guild || !msg.channel || !msg.guild.me.permissionsIn(msg.channel).has('SEND_MESSAGES'))
        return;
    const prefixes = [
        await lappy.db.get('guild_prefix', msg.guild.id, '?'),
        `<@${lappy?.user?.id}>`,
        `<@!${lappy?.user?.id}>`,
        'lappy'
    ], prefix = await prefixes.find((prefix) => msg.content.toLowerCase().startsWith(prefix)) || '';
    let { channel: ch, guild: gd, author, member: memb } = msg, args = new Arguments_1.Arguments(msg, prefix);
    if (!prefix)
        return;
    let cmd = args.shift();
    const command = lappy.cmds.default.find((CMD) => CMD.names.includes(cmd?.toLowerCase()));
    if (!command)
        return;
    if ((command.dev && !lappy.owners.includes(author.id)) || (lappy.owners.includes(author.id) && args.ends.includes('--dev-error')))
        return lappy.permsError({ author }, msg, ['developer']);
    if ('perms' in command)
        if (command.perms
            .map((perm) => memb.permissionsIn(ch).has(perm))
            .some((perm) => !perm))
            return lappy.permsError({ author }, msg, command.perms);
    if ('bot_perms' in command) {
        if (command.bot_perms
            .forEach((perm) => memb.permissionsIn(ch).has(perm))
            .some((perm) => !perm))
            return lappy.permsError({ author: lappy.user }, msg, command.bot_perms);
    }
    ;
    const req_fields = command?.fields?.filter((field) => field.req) || [];
    if (req_fields.length > args.len) {
        const index = req_fields.length - args.len;
        return lappy.sendError({ author }, msg, 'Field', `Field ${index} ['${req_fields[index - 1]?.name || 'unknow-name'}'] Cannot Be Empty`);
    }
    ;
    try {
        return await command.run({ command, prefixes, lappy, author, memb, args, cmd, msg, ch, gd });
    }
    catch (error) {
        console.log(error);
        return lappy.sendError({ author }, msg, error.name, error.stack);
    }
}
exports.run = run;
;
//# sourceMappingURL=msg.js.map