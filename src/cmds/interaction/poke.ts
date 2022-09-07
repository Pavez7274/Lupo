// imports
import { Data } from '../../../types/data';

// exports
export default {
	names: [
		'poke'
	],
	fields: [{
		name: 'target', 
		type: 'memberResolvable', 
		req: true
	}], 
	type: 'default',
	desc: 'no desc', 
	run: async (d: Data): Promise<any> => {
		let snowy = await d.lappy.util.findMember(d.gd, d.args.string()), title: string;
		if (!snowy)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().slice(0, 10)}']`);
		if (snowy.id === d.lappy?.user?.id) {
			title = `${d.memb.displayName} are pat me ${d.lappy.emotes.luv}`
		} else if (snowy.id === d.author.id) {
			title = `${d.memb.displayName}'s pats him/herself -w-`
		} else {
			title = `${d.memb.displayName} fastidia a ${snowy.displayName}`
		}
		let result = await d.lappy.neko.img('poke'),
		embeds = d.lappy.makeEmbeds(d, {
			image: { url: result.url }, 
			title,
			footer: { text: `anime: ${result.anime_name}` }
		});
		return d.msg.reply({ embeds })
	}
};