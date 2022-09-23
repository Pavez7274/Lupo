// imports 
import { Data } from '../../../types/data';

// exports 
export default {
	names: ['nowplaying', 'np'],
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let q = d.lappy.music.getQueue(d.gd);
		if (!q)
			return d.lappy.sendError(d, d.msg, 'No Queue', 'I\'m not in a voice chat');
		if (!q.songs?.[0])
			return d.lappy.sendError(d, d.msg, 'No Song', 'NO_PLAYING_ERROR');
		const song = q.songs[0];
		d.msg.reply({
			embeds: d.lappy.makeEmbeds(d, {
				title: `${d.lappy.emotes.feli} | Song Info -> ${song.source}`,
				description: `**[ Name ]** -> [${song.name}](${song.url})${
					song.playlist ? `\n**[ PlayList ]** -> [${song.playlist.name}](${song.playlist.url})` : ''
				} 
**[ Uploader ]** -> [${song.uploader.name}](${song.uploader.url})
**[ Duration ]** -> \`${song.formattedDuration}\`
**[ Added By ]** -> ${song.member?.toString()} ||${song.user?.id}||
**[ Explicit ]** -> \`${song.age_restricted ? 'Yes' : 'No'}\`
**[ Views ]** -> \`${song.views?.toLocaleString() ?? 0}\``,
				thumbnail: { url: song.thumbnail }
			})
		});
	}
};