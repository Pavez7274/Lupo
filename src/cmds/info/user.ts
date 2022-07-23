// imports 
import { findUser } from '../../util/findUser';
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
	type: 'default', 
	fields: [{
		name: 'target', 
		type: 'userResolvable', 
		req: false
	}], 
	run: async (d: Data) => {
		await d.gd.members.fetch();
		let user: any, member: void | GuildMember;
		if (d.args.len)
			user = await findUser(d.lappy, d.args.string());
		else user = await d.author.fetch();
		if (!user)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		member = await d.gd.members.fetch(user.id).catch(() => {});
		/*
		let msg = [
			`Identifier -> \`${user.id}\``,
			`Type       -> \`${user.bot ? 'Bot' : user.system ? 'System' : 'User'}\``,
			`Color      -> \`${user.accentColor ? '#' + user.accentColor.toString(16) : 'None'}\``, 
			`Creation   -> <t:${Math.round(Number(user.createdAt)/1000)}>`,
		];
		if(member) {
			member.joinedAt && msg.push(`Joined :: <t:${Math.round(Number(member.joinedAt)/1000)}>`);
			member.nickname && msg.unshift(`Nickname :: \`${member.nickname}\``);
			if (member.presence?.activities) {
				let sp = member.presence.activities.find((act) => act.name === 'Spotify');
				if (sp) {
					msg.push(`**Listening [${sp.details ?? 'unknown'}](https://open.spotify.com/track/${sp.syncId})**`)
				};
			};
		};
		*/
		let msg = `Id :: \`${user.id ?? 'unknown'}\`\nType :: \`${user.system ? 'System' : user.bot ? 'Bot' : 'User'}\`\n${user.accentColor ? `Color :: \`#${user.accentColor.toString(16)}\`\n` : ''}Creation :: <t:${Math.round(Number(user.createdAt)/1000)}>\n${member?.joinedAt ? `Joined :: <t:${Math.round(Number(member.joinedAt)/1000)}>\n` : ''}${member?.nickname ? `Nickname :: \`${member.nickname}\`\n` : ''}`;
		if (member?.presence?.activities) {
			msg += member.presence.activities.map(k => {
   			if (k.type === 0) return `Playing: ${k.name}`;
   			if (k.type === 2) return `Listening on ${k.name.toLowerCase()}: ${k.details}`;
   			else return `${nya[k.type]}: ${k.emoji ? k.emoji.toString() + ' ' : ''}${k.details ?? k.state ?? 'unknown'}`
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