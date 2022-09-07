// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'dance', 
	],
	type: 'default',
	desc: '', 
	run: async (d: Data): Promise<any> => {
		let title = `${d.memb.displayName} está bailando ${d.lappy.emotes.facha}`
		let result = await d.lappy.neko.img('dance'),
		embeds = d.lappy.makeEmbeds(d, {
			image: { url: result.url }, 
			title,
			footer: { text: `anime: ${result.anime_name}` }
		});
		return d.msg.reply({ embeds })
	}
};