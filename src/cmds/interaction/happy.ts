// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'happy'
	],
	type: 'default',
	desc: '', 
	run: async (d: Data): Promise<any> => {
		let title = `${d.memb.displayName} is happy ${d.lappy.emotes.feli}`
		let result = await d.lappy.neko.img('happy'),
		embeds = d.lappy.makeEmbeds(d, {
			image: { url: result.url }, 
			title,
			footer: { text: `anime: ${result.anime_name}` }
		});
		return d.msg.reply({ embeds })
	}
};