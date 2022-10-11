// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'highfive',
	],
	fields: [{
		name: 'target', 
		type: 'memberResolvable', 
		req: true
	}], 
	desc: 'High-Five to someone', 
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let snowy = await d.lappy.util.findMember(d.gd, d.args.string());
		if (!snowy)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		if (snowy.id === d.lappy?.user?.id) {
			return d.msg.reply([
				'Ew, no.',
				'Wash ur hand', 
				'No.',
			].random());
		} else if (snowy.id === d.author.id) {
			return d.msg.reply(`that's s${'o'.repeat(d.lappy.util.random(5, 1))} pathetic`);
		};
		let result = await d.lappy.neko.img('highfive'),
		embeds = d.lappy.makeEmbeds(d, {
			image: { url: result.url }, 
			title: `${d.memb.displayName} choca los cinco con ${snowy.displayName} ${d.lappy.emotes.facha}`,
			footer: { text: `anime: ${result.anime_name}` }
		});
		return d.msg.reply({ embeds })
	}
};