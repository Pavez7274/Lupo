// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'kiss'
	],
	fields: [{
		name: 'target', 
		type: 'memberResolvable', 
		req: true
	}], 
	desc: 'uh, well, u know, what couples do...', 
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let snowy = await d.lappy.util.findMember(d.gd, d.args.string());
		if (!snowy)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		if (snowy.id === d.lappy?.user?.id) {
			return d.msg.reply('Ew, no.');
		} else if (snowy.id === d.author.id) {
			return d.msg.reply('You\'re narcissistic?!?')
		};
		let result = await d.lappy.neko.img('kiss'),
		embeds = d.lappy.makeEmbeds(d, {
			image: { url: result.url }, 
			title: `${d.memb.displayName} kiss to ${snowy.displayName} ${(await import('../../util/protos')).faces.random()}!!`,
			footer: { text: `anime: ${result.anime_name}` }
		});
		return d.msg.reply({ embeds })
	}
};