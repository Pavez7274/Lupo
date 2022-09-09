// imports
import { Lupo } from '../structures/Lupo';
import { Queue, Song } from 'distube';

// exports 
export const name = 'addSong';
export const type = 'music';
export function run (lappy: Lupo, queue: Queue, song: Song): void {
	song.metadata!.msg.reply({
		embeds: lappy.makeEmbeds(song.metadata, {
			title: `${lappy.emotes.feli} | Song Added -> ${song.source}`, 
			description: `**[ Song ]** -> [${song.name}](${song.url})${
				song.playlist ? `**[ PlayList ]** -> [${song.playlist.name}](${song.playlist.url})\n` : ''
			} 
**[ Uploader ]** -> [${song.uploader.name}](${song.uploader.url})
**[ Duration ]** -> \`${song.formattedDuration}\`
**[ Added By ]** -> ${song.member.toString()} ||${song.user.id}||
**[ Explicit ]** -> \`${song.age_restricted ? 'Yes' : 'No'}\`
**[ Views ]** -> \`${song.views?.toLocaleString() ?? 0}\``, 
			thumbnail: { url: song.thumbail } 
		})
	});
};