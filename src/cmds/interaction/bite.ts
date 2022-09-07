// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'bite'
	],
	fields: [{
		name: 'target', 
		type: 'memberResolvable', 
		req: true
	}], 
	desc: 'muerde a alguien', 
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let snowy = await d.lappy.util.findMember(d.gd, d.args.string());
		if (!snowy)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		if (snowy.id === d.lappy?.user?.id) {
			return d.msg.reply([
				'ew, no.',
				'no.',
			].random());
		} else if (snowy.id === d.author.id) {
			return d.msg.reply(`that's s${'o'.repeat(d.lappy.util.random(5, 1))} pathetic`);
		};
		let result = await d.lappy.neko.img('bite'),
		embeds = d.lappy.makeEmbeds(d, {
			image: { url: result.url }, 
			title: `${d.memb.displayName} muerde a ${snowy.displayName}`,
			footer: { text: `anime: ${result.anime_name}` }
		});
		return d.msg.reply({ embeds })
	}
};