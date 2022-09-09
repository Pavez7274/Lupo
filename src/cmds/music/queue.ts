// imports 
import { Data } from '../../../types/data';
import { Song } from 'distube'; 

// exports 
export default {
	names: [
		'queue', 
		'list', 
		'q'
	],
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let q = d.lappy.music.getQueue(d.gd);
		if (!q)
			return d.lappy.sendError(d, d.msg, 'No Queue', 'I\'m not in a voice chat');
		q.songs.shift();
		if (!q.songs)
			return d.lappy.sendError(d, d.msg, 'No Songs', 'No songs on hold');
		q = d.lappy.makeEmbeds(d, ...q.songs.map((song: Song, index: number) => `**${
			index + 1
		}.** [${
			song.name
		}](${
			song.url
		})${
			song.name
				.toLowerCase()
				.includes(song.uploader.name.toLowerCase())
			? '' : ` by [${song.uploader.name}](${song.uploader.url})`
		}`).chunk(10).map((a: string[], i: number, k: array[]) => ({
			description: `${a.join('\n')}\n\n**Page ${ i + 1 } of ${ k.length }**`
		})));
		let msg = await d.msg.reply({ embeds: [q[0]] });
		return d.paginator(d, msg, q, 6e4);
	}
};