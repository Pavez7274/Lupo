// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: [
		'song_thumbnail'
	],
	type: 'button',
	run: async (d: Data): Promise<any> => {
		// console.log(d.track);
		const embeds = d.lappy.makeEmbeds(d, {
			image: d.track.album.images[0]
		});
		return d!.int.reply({ embeds, ephemeral: true });
	}
};