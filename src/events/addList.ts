// imports
import { Lupo } from '../structures/Lupo';
import { Queue, Playlist } from 'distube';
import { Data } from '../../types/data';

// exports 
export const name = 'addList';
export const type = 'music';
export function run(lappy: Lupo, queue: Queue, playlist: Playlist<Data>): void {
	playlist.metadata.msg.reply({
		embeds: lappy.makeEmbeds(playlist.metadata, {
			title: `${lappy.emotes.feli} | PlayList Added -> ${playlist.source}`,
			description: `**[ Name ]** -> [${playlist.name}](${playlist.url})
**[ Songs ]** -> ${playlist.songs.length}
**[ Duration ]** -> \`${playlist.formattedDuration}\`
**[ Added By ]** -> ${playlist.member?.toString()} ||${playlist.user?.id}||
**[ Explicit ]** -> \`${playlist.songs.some((s: any) => s.age_restricted) ? 'Yes' : 'No'}\``,
			thumbnail: { url: playlist.thumbnail }
		})
	});
};