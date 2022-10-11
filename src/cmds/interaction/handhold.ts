// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'handhold',
		'takehand'
	],
	fields: [{
		name: 'target', 
		type: 'memberResolvable', 
		req: true
	}], 
	desc: 'hold someone\'s hand', 
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
				'Of course, when communism works'
			].random());
		} else if (snowy.id === d.author.id) {
			return d.msg.reply(`that's s${'o'.repeat(d.lappy.util.random(5, 1))} pathetic`);
		};
		let result = await d.lappy.neko.img('handhold'),
		embeds = d.lappy.makeEmbeds(d, {
			image: { url: result.url }, 
			title: `${d.memb.displayName} is holding hands with ${snowy.displayName} ${(await import('../../util/protos')).faces.random()}`,
			footer: { text: `anime: ${result.anime_name}` }
		});
		return d.msg.reply({ embeds })
	}
};