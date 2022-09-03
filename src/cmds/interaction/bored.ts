// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'bored', 
	],
	type: 'default',
	desc: '', 
	run: async (d: Data): Promise<any> => {
		let title = `${d.memb.displayName} is bored ${d.lappy.emotes.death}`
		let result = await d.lappy.neko.img('bored'),
		embeds = d.lappy.makeEmbeds(d, {
			image: { url: result.url }, 
			title,
			footer: { text: `anime: ${result.anime_name}` }
		});
		return d.msg.reply({ embeds })
	}
};