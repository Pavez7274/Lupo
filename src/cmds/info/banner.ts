// imports
import { findUser } from '../../util/findUser';

export default {
	names: [
		'banner', 
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
		else user = await d.author.fetch();
		if (!user)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		let url = user.bannerURL({ size: 4096, dynamic: true });
		if (url) {
			var embeds = d.lappy.makeEmbeds(d, {
				title: user.tag,
				url, 
				image: { url }
			});
		} else if (user.accentColor) {
			var embeds = d.lappy.makeEmbeds(d, {
				title: user.tag,
				description: `The user in question does not own an image in his banner, but the accent color he/she uses is **\`${'#' + user.accentColor.toString(16)}\`**`
			});
		} else {
			var embeds = d.lappy.makeEmbeds(d, {
				title: user.tag, 
				description: 'The user in question doesn\'t have a banner or accent color' 
			});
		};
		return d.msg.reply({ embeds })
	}
};