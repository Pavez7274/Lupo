// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'kick'
	],

	desc: 'Kick someone', 
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let snowy = await d.lappy.util.findMember(d.gd, d.args.string());
		if (!snowy)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().cropAt(10)}']`);
		if (snowy.id === d.lappy?.user?.id) {
			return d.msg.reply('*Dodge');
		} else if (snowy.id === d.author.id) {
			return d.msg.reply('Why??')
		};
		let result = await d.lappy.neko.img('kick'),
		embeds = d.lappy.makeEmbeds(d, {
			image: { url: result.url }, 
			title: `${d.memb.displayName} kicked ${snowy.displayName}`,
			footer: { text: `anime: ${result.anime_name}` }
		});
		return d.msg.reply({ embeds })
	}
};