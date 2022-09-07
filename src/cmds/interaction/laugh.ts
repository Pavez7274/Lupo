// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'laugh'
	],
	desc: 'riete, riata?.', 
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let result = await d.lappy.neko.img('laugh'),
		embeds = d.lappy.makeEmbeds(d, {
			image: { url: result.url }, 
			title: `${d.memb.displayName} se rie`,
			footer: { text: `anime: ${result.anime_name}` }
		});
		return d.msg.reply({ embeds })
	}
};