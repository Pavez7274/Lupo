// imports
import { PermissionResolvable } from 'discord.js';
import { Arguments } from '../structures/Arguments';
import { Lupo } from '../structures/Lupo';
import { Msg } from '../../types/data';

// exports
export const name = 'messageCreate';
export const type = 'dsc';
export async function run (lappy: Lupo, msg: Msg): Promise<any | void> {
	if (msg.author.bot || !msg.guild.me.permissionsIn(msg.channel).has('SEND_MESSAGES')) return;
	await msg.guild.members.fetch()?.catch(() => {});
	const prefixes = [
		// custom prefix
		await lappy.db.get('guild_prefix', msg.guild.id, '?'),
		// mentions
		`<@${lappy?.user?.id}>`,
		`<@!${lappy?.user?.id}>`,
		// uhhm... nickname??
		'lappy'
	],
		// search among any of the above prefixes
		prefix = await prefixes.find((prefix: string) => msg.content.toLowerCase().startsWith(prefix)) || '';
  let { 
		channel: ch, 
		guild: gd, 
		author, 
		member: memb
	} = msg,
		args = new Arguments(msg, prefix);
	
	// prefix commands
	if (prefixes.slice(1).includes(msg.content.trim()))
		return msg.reply('my prefix here is `'.concat(prefixes[0].concat('`')))
	if (!prefix) return;
	let cmd = args.shift();
	const command = lappy.cmds.default.find((CMD: any) => CMD.names.includes(cmd?.toLowerCase()));
  if (!command) return;
  if ((command.dev && !lappy.owners.includes(author.id)) || (lappy.owners.includes(author.id) && args.ends.includes('--dev-error')))
    return lappy.permsError({ author }, msg, [ 'developer' ]); 
  if ('perms' in command)
		if (command.perms
				?.map((perm: PermissionResolvable) => memb.permissionsIn(ch).has(perm))
				?.some((perm: boolean) => !perm))
			return lappy.permsError({ author }, msg, command.perms);
    if ('bot_perms' in command) {
			if (command.bot_perms
					?.forEach((perm: PermissionResolvable) => gd?.me?.permissionsIn(ch)?.has(perm))
					?.some((perm: boolean) => !perm))
				return lappy.permsError({ author: lappy.user }, msg, command.bot_perms);
    };
	const req_fields = command?.fields?.filter((field: any) => field.req) || [];
	if (req_fields.length > args.len) {
		const index = req_fields.length - args.len;
		return lappy.sendError({ author }, msg, 'Field', `Field ${index} ['${req_fields[index - 1]?.name || 'unknow-name'}'] Cannot Be Empty`);
  };
	try {
		return await command.run({ command, prefixes, lappy, author, memb, args, cmd, msg, ch, gd });
	} catch (error) {
		console.log(error);
		// @ts-ignore
		return lappy.sendError({ author }, msg, error.name, error.stack);
	};
};