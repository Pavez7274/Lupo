"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.type = exports.name = void 0;
const discord_js_1 = require("discord.js");
const Arguments_1 = require("../structures/Arguments");
exports.name = 'messageCreate';
exports.type = 'dsc';
async function run(lappy, msg) {
    if (msg.author.bot || !msg.channel.permissionsFor(await msg.guild.members.fetchMe()).has(discord_js_1.PermissionFlagsBits.SendMessages) || (await msg.guild.members.fetchMe()).isCommunicationDisabled())
        return;
    await msg.guild.members.fetch()?.catch(() => { });
    const prefixes = [
        await lappy.db.get('guild_prefix', msg.guild.id, '?'),
        `<@${lappy?.user?.id}>`,
        `<@!${lappy?.user?.id}>`,
        'lappy'
    ], prefix = await prefixes.find((prefix) => msg.content.toLowerCase().startsWith(prefix)) || '';
    let { channel: ch, guild: gd, author, member: memb } = msg, args = new Arguments_1.Arguments(msg, prefix);
    author = await author.fetch() ?? author;
    if (prefixes.slice(1).includes(msg.content.trim()))
        return msg.reply('my prefix here is `'.concat(prefixes[0].concat('`')));
    if (!prefix)
        return;
    let cmd = args.shift()?.replace(/-/g, '');
    const command = lappy.cmds.default.find((CMD) => CMD.names.includes(cmd?.toLowerCase()));
    if (!command)
        return;
    if ((command.dev && !lappy.owners.includes(author.id)) || (lappy.owners.includes(author.id) && args.endIsTrue('--dev-error')))
        return lappy.permsError({ author }, msg, ['developer']);
    if ('perms' in command)
        if (command.perms
            ?.map((perm) => memb.permissionsIn(ch).has(discord_js_1.PermissionFlagsBits[perm]))
            ?.some((perm) => !perm))
            return lappy.permsError({ author }, msg, command.perms);
    if (command.voiceRequired && !memb.voice?.channel)
        return lappy.sendError({ author }, msg, 'Voice Required', 'You must be on a voice channel to use this command');
    if ('bot_perms' in command)
        if (command.bot_perms
            ?.map(async (perm) => (await gd.members.fetchMe())?.permissionsIn(ch)?.has(discord_js_1.PermissionFlagsBits[perm]))
            ?.some((perm) => !perm))
            return lappy.permsError({ author: lappy.user }, msg, command.bot_perms);
    const req_fields = command?.fields?.filter((field) => field.req) || [];
    if (req_fields.length > args.len) {
        const index = req_fields.length - args.len;
        return lappy.sendError({ author }, msg, 'Field', `Field ${index} ['${req_fields[index - 1]?.name || 'unknown'}'] Cannot Be Empty\nCorrect use: '${args.prefix}${command.names[0]} ${command.parsedFields}'`);
    }
    ;
    try {
        return await command.run({ ...lappy.util, command, prefixes, lappy, author, memb, args, cmd, msg, ch, gd });
    }
    catch (error) {
        console.log(error);
        return lappy.sendError({ author }, msg, error.name, error.stack);
    }
    ;
}
exports.run = run;
;
//# sourceMappingURL=msg.js.map