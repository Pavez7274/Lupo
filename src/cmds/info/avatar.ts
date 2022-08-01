// imports
import { GuildMember, User } from 'discord.js';
import { ContextData, Data } from '../../../types/data';

export default {
	names: [
		'avatar', 
		'icon'
	],
	fields: [{
		name: 'target', 
		type: 'userResolvable', 
		req: false
	}], 
	desc: 'see the avatar of some user', 
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let user: User | void, memb: GuildMember | void;
		if (d.args.len)
			user = await d.lappy.util.findUser(d.lappy, d.args.string());
		else user = d.author;
		if (!user)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		memb = await d.gd.members.fetch(user.id).catch(() => {});
		let url = ((d.args.endIsFalse('global', true) && memb) || user).displayAvatarURL({ size: 4096 }),
			embeds = d.lappy.makeEmbeds(d, {
				title: `${d.lappy.emotes.tofu} | ${user.tag}`,
				url, 
				image: {
					url
				}
		});
		return d.msg.reply({ embeds })
	}, 
	contextRun: async (d: ContextData) => {
		let url = (d.int.targetMember as GuildMember).displayAvatarURL({ size: 4096 });
		return d.int.reply({
			embeds: d.lappy.makeEmbeds(d, {
				title: `${d.lappy.emotes.tofu} | ${d.int.targetUser.tag}`, 
				image: { url }, 
				url
			})
		});
 	}
};