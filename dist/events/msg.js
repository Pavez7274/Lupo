"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.type = exports.name = void 0;
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
    let { channel: ch, guild: gd, author, member: memb } = msg, args = new Args(msg, prefix);
    if (prefixes.slice(1).includes(msg.content.trim()))
        lappy.cmds.always.get(1).run({ prefixes, author, lappy, memb, args, msg, ch, gd });
    if (!prefix)
        return;
    let cmd = await args.shift();
    const command = lappy.cmds.default.find((_cmd_) => _cmd_.help.names.includes(cmd.toLowerCase()));
    if (!command)
        return;
    if ((command.help.dev && !lappy.owners.includes(author.id)) || (lappy.owners.includes(author.id) && args.ends.includes('--dev-error')))
        return lappy.permsError({ author }, msg, ['developer']);
    if (command.help.perms)
        if (command.help.perms
            .map((perm) => memb.permissionsIn(ch).has(perm))
            .some((perm) => !perm))
            return lappy.permsError({ author }, msg, command.help.perms);
    if (command.help.bot_perms) {
        if (command.help.bot_perms
            .forEach((perm) => memb.permissionsIn(ch).has(perm))
            .some((perm) => !perm))
            return lappy.permsError({ author: lappy.user }, msg, command.help.bot_perms);
    }
    ;
    const req_fields = command.help?.fields?.filter((field) => field.req) || [];
    if (req_fields.length > args.len()) {
        const index = req_fields.length - args.len();
        return lappy.sendError({ author }, msg, 'Field', `Field ${index} ['${req_fields[index - 1]?.name || 'unknow-name'}'] Cannot Be Empty`);
    }
    ;
    return await command.run({ command, prefixes, lappy, author, memb, args, cmd, msg, ch, gd }).catch((err) => {
        console.log(err);
        return lappy.sendError({ author }, msg, err.name, err.stack);
    });
}
exports.run = run;
;
//# sourceMappingURL=msg.js.map