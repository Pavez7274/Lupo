// imports 
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction } from 'discord.js';
import { Data } from '../../../types/data';

// utils
function pad (n: number, z: number = 2) {
	return ('00' + n).slice(-z);
};
function parse (ms: number) {
	return pad((ms%3.6e6)/6e4|0) + ':' + pad((ms%6e4)/1e3|0);
};

// exports 
export default {
	names: [
		'search',
		'song',
		'track',
		'playlist'
	],
	fields: [{
		name: 'name', 
		req: true, 
		type: 'string'
	}], 
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let { tracks } = await d.lappy.spotify.search({
			q: d.args.string()
		});
		if (!tracks?.items) 
			return d.lappy.sendError(d, d.msg, 'not found', `I couldn't find the song ['${d.args.string().cropAt(10) ?? 'unknown'}']`);
		if (d.args.endIsTrue('list') || d.args.endIsTrue('l')) {
			let embeds = d.lappy.makeEmbeds(d, {
				title: `${d.lappy.emotes.spotify} | Search on Spotify`, 
				description: tracks.items.map((t: any, r: number) => `\`${r + 1}.\` **[${t.name}](${t.external_urls.spotify}) by [${t.artists[0].name}](${t.artists[0].external_urls.spotify})**`).join('\n')
			});
			return d.msg.reply({ embeds });
		};
		let i = Number(d.args.getEndValue('index') || 1) - 1;
		if (isNaN(i) || Math.floor(i) != i || 0 > i || tracks.items.length - 1 < i) 
			return d.lappy.sendError(d, d.msg, 'invalid type', '[--index] must be a valid number');
		let track = tracks.items[i];
		let embeds = d.lappy.makeEmbeds(d, {
			title: `${d.lappy.emotes.spotify} | Search on Spotify`,
			description: `**Song** :: [${track.name}](${track.external_urls.spotify})
**Artists** :: ${track.artists.map((art: any) => `[${art.name}](${art.external_urls.spotify})`).join(' | ')}
**${track.album.type.toTitleCase()}** :: [${track.album.name}](${track.album.external_urls.spotify})
**Duration** :: ${parse(track.duration_ms)}
**Explicit** :: ${track.explicit ? 'Yes' : 'No'}

[Click here to listen a preview](${track.preview_url})`,
			thumbnail: { url: track.album.images[0].url }
		}), components = [new ActionRowBuilder()];
		components[0].setComponents(
			new ButtonBuilder().setCustomId('songThumbnail').setLabel('Get Thumbnail').setStyle(1)
		);
		const msg = await d.msg.reply({ embeds, components });
		msg.createMessageComponentCollector({
			filter: ({ customId }) => customId == 'songThumbnail',
			componentType: 2 as any,
			time: 6e4
		})
			.on('collect', (int: ButtonInteraction) => {
				let data = { int, track, ...d };
				d.lappy.cmds.button.get('song_thumbnail').run(data);
			})
			.on('end', () => {
				components[0].components[0].setDisabled(true);
				msg.edit({ components });
			});
	}
};