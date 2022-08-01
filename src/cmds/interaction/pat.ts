// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'pat'
	],
	fields: [{
		name: 'target', 
		type: 'memberResolvable', 
		req: true
	}], 
	type: 'default',
	desc: 'pat someone!!', 
	run: async (d: Data): Promise<any> => {
		let snowy = await d.lappy.util.findMember(d.gd, d.args.string()), title: string;
		if (!snowy)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		if (snowy.id === d.lappy?.user?.id) {
			title = `${d.memb.displayName} are pat me ${d.lappy.emotes.luv}`
		} else if (snowy.id === d.author.id) {
			title = `${d.memb.displayName}'s pats him/herself -w-`
		} else {
			title = `${d.memb.displayName}'s pats ${snowy.displayName} ${d.lappy.emotes.feli}`
		}
		let embeds = d.lappy.makeEmbeds(d, {
			image: await d.lappy.neko.img('pat'), 
			title
		});
		return d.msg.reply({ embeds })
	}
};