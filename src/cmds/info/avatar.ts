// imports
import { findUser } from '../../util/findUser';

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
	run: async (d: any): Promise<any> => {
		await d.gd.members.fetch();
		let user: any;
		if (d.args.len)
			user = await findUser(d.lappy, d.args.string());
		else user = d.author;
		if (!user)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		let url = user.displayAvatarURL({ size: 4096, dynamic: true }),
			embeds = d.lappy.makeEmbeds(d, {
				title: user.tag,
				url, 
				image: {
					url
				}
		});
		return d.msg.reply({ embeds })
	}
};