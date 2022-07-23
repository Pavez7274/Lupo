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
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let snowy = await d.lappy.util.findMember(d.gd, d.args.string());
		if (!snowy)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		if (snowy.id === d.lappy?.user?.id) {
			return d.msg.reply('ew no');
		} else if (snowy.id === d.author.id) {
			return d.msg.reply('u\'re narcissistic?!?')
		};
		let embeds = d.lappy.makeEmbeds(d, {
			image: await d.lappy.neko.img('kiss'), 
			title: `${d.memb.displayName} is kissing ${snowy.displayName} ${(await import('../../util/protos')).faces.random()}!!`
		});
		return d.msg.reply({ embeds })
	}
};