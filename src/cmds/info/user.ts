// imports 
import { Data } from '../../../types/data';
import { GuildMember } from 'discord.js';
const nya = [
	'Playing', 'Streaming',
	'Listening', 'Watching', 
	'Custom', 'Competing'
];

// exports
export default {
	names: [
		'userinfo', 
		'user'
	],
	fields: [{
		name: 'target', 
		type: 'userResolvable', 
		req: false
	}], 
	desc: 'view a user\'s public information', 
	type: 'default', 
	run: async (d: Data) => {
		await d.gd.members.fetch();
		let user: any, member: void | GuildMember;
		if (d.args.len)
			user = await d.lappy.util.findUser(d.lappy, d.args.string()) ?? await (await d.lappy.util.findMember(d.gd, d.args.string()))?.user;
		else user = await d.author.fetch();
		if (!user)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		member = await d.gd.members.fetch(user.id).catch(() => {});
		let msg = `**Id** :: \`${user.id ?? 'unknown'}\`\n**Type** :: \`${user.system ? 'System' : user.bot ? 'Bot' : 'User'}\`\n${user.accentColor ? `**Color** :: \`#${user.accentColor.toString(16)}\`\n` : ''}**Creation** :: <t:${Math.round(Number(user.createdAt)/1000)}>\n${member?.joinedAt ? `**Joined** :: <t:${Math.round(Number(member.joinedAt)/1000)}>\n` : ''}${member?.nickname ? `**Nickname** :: \`${member.nickname}\`\n` : ''}`;
		if (member?.presence?.activities) {
			msg += member.presence.activities.map(k => {
   			if (k.type === 0) return `**Playing** :: ${k.name}`;
   			if (k.type === 2) return `**Listening (${k.name.toTitleCase()})** :: \`${k.details}\` by **${k.state?? 'unknow'}**`;
   			else return `**${k.name}** :: ${k.emoji ? k.emoji.toString() + ' ' : ''}${k.details ?? k.state ?? 'unknow'}`
			}).join('\n');
		};
		let embeds = d.lappy.makeEmbeds(d, {
			title: `${d.lappy.emotes.tofu} | ${user.tag} Information`,
			description: msg, 
			thumbnail: {
				url: user.displayAvatarURL({ size: 1024, dynamic: true })
			}
		});
		return d.msg.reply({ embeds });
	}
};