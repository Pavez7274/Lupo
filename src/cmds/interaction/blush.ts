// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'blush', 
    'flush'
	],
	type: 'default',
	desc: '', 
	run: async (d: Data): Promise<any> => {
		let title = `${d.memb.displayName} se sonroja ${d.lappy.emotes.luv}`
		let result = await d.lappy.neko.img('blush'),
		embeds = d.lappy.makeEmbeds(d, {
			image: { url: result.url }, 
			title,
			footer: { text: `anime: ${result.anime_name}` }
		});
		return d.msg.reply({ embeds })
	}
};