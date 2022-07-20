// imports
import { findUser } from '../../util/findUser';
import { Data } from '../../../types/data';

export default {
	names: [
		'avatar', 
		'icon'
	],
	type: 'default',
	fields: [{
		name: 'target', 
		type: 'userResolvable', 
		req: false
	}], 
	run: async (d: Data): Promise<any> => {
		let user: any, memb: any;
		if (d.args.len)
			user = await findUser(d.lappy, d.args.string());
		else user = d.author;
		if (!user)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		memb = await d.gd.members.fetch(user.id).catch(() => {});
		let url = ((d.args.endIsFalse('global', true) && memb) || user).displayAvatarURL({ size: 4096, dynamic: true }),
			embeds = d.lappy.makeEmbeds(d, {
				title: `${d.lappy.emotes.tofu} | ${user.tag}`,
				url, 
				image: {
					url
				}
		});
		return d.msg.reply({ embeds })
	}
};