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
			return d.lappy.sendError(d, d.msg, 'No Music', 'I\'m not in a voice chat');
		let s = q.songs.slice(1);
		if (!s?.length)
			return d.lappy.sendError(d, d.msg, 'No Songs', 'No songs on hold');
		s = s.map((song: Song, index: number) => `**${
			index + 1
		}. [${
			song.name
		}](${
			song.url
		})**\n*[${
			song.uploader.name
		}](${
			song.uploader.url
		}) - ${
			song.member?.toString()
		}*`).chunk(10).map((a: string[], i: number, k: array[]) => ({
			title: ':notes: | Track listing', 
			description: `${a.join('\n')}\n\n**Page ${ i + 1 } of ${ k.length }**`,
			thumbnail: { url: d.memb.displayAvatarURL() }
		}));
		s = d.lappy.makeEmbeds(d, ...s);
		let msg = await d.msg.reply({ embeds: [s[0]] });
		return d.paginator(d, msg, s, 6e4);
	}
};