// imports 
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, GuildMember } from 'discord.js';
import { Data, ContextData} from '../../../types/data';
import * as axios from 'axios';

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
		'whatlisten',
		'whathear', 
		'wl'
	],
	context: 'what listen', 
	fields: [{
		name: 'target',
		type: 'userResolvable',
		req: false
	}],
	description: 'returns information about the song that a user hears (only supports spotify)', 
	type: 'default',
	run: async (d: Data): Promise<any> => {
		let memb = d.args.get(0)
			? await d.lappy.util.findMember(d.gd, d.args.string())
			: await d.memb.fetch();
		if (!memb)
			return d.lappy.sendError(d, d.msg, 'not found', `No Matches Were Found With ['${d.args.string().cropAt(10)}']`);
		let activities = memb.presence?.activities;
		if (!activities || !activities!?.some(({ name }) => name === 'Spotify')) 
			return d.lappy.sendError(d, d.msg, 'No Music', `${memb.user.id === d.author.id ? 'u aren\'t' : 'This user isn\'t'} listening anything or I can't see it`);
		let activity = activities!?.find(({ name }) => name === 'Spotify');
		let track = (await d.lappy.spotify.search({ q: activity?.details }))?.tracks.items
			.find((item: any) => item.name === activity?.details && (item.artists.every(({ name }) => activity?.state?.includes(name))));
		if (!track) 
			return d.lappy.sendError(d, d.msg, 'not found', `I couldn't find the song ['${activity.details ?? 'unknown'}']`);
		let embeds = d.lappy.makeEmbeds(d, {
			title: `${d.lappy.emotes.spotify} | What does ${memb.user.id === d.author.id ? 'u' : memb.displayName} listen to?`,
			description: `**Song** :: [${track.name}](${track.external_urls.spotify})
**Artists** :: ${track.artists.map((art: any) => `[${art.name}](${art.external_urls.spotify})`).join(' | ')}
**${track.album.type.toTitleCase()}** :: [${track.album.name}](${track.album.external_urls.spotify})
**Duration** :: ${parse(Date.now() - activity?.timestamps?.start)} / ${parse(track.duration_ms)}
**Explicit** :: ${track.explicit ? 'Yes' : 'No'}

[Click here to listen a preview](${track.preview_url})`,
			thumbnail: { url: track.album.images[0].url }
		}), components = [new ActionRowBuilder()], lyrics = await axios.get('https://makeitpersonal.co/lyrics', {
			params: {
				artist: track.artists[0].name,
				title: track.name
			}
		}).catch(() => {});
		lyrics &&= lyrics.data;
		components[0].setComponents(
			new ButtonBuilder().setCustomId('songThumbnail').setLabel('Get Thumbnail').setStyle(1), 
			new ButtonBuilder().setCustomId('songLyrics').setLabel('Get Lyrics').setStyle(1).setDisabled(!lyrics)
		);
		const msg = await d.msg.reply({ embeds, components });
		msg.createMessageComponentCollector({
			filter: ({ customId }) => ['songThumbnail', 'songLyrics'].includes(customId), 
			componentType: 2 as any,
			time: 6e4
		})
			.on('collect', (int: ButtonInteraction) => {
				if (int.customId === 'songLyrics' && !!lyrics) {
					let chunkedLyrics = lyrics.trim().split(/\n/).chunk(20);
					chunkedLyrics = chunkedLyrics.map((chunk: string[], index: number) => d.lappy.makeEmbeds(d, {
						title: `:musical_score: | Lyrics - ${track.name}`,
						description: `${chunk.join('\n').toCodeBlock()}\n\n**Page ${index + 1} of ${chunkedLyrics.length}**`,
						thumbnail: { url: track.album.images[0].url } 
					})[0])
					return d.paginator(d, int, chunkedLyrics, 6e4, true);
				};
				let data = { int, track, ...d };
				d.lappy.cmds.button.get('song_thumbnail').run(data);
			})
			.on('end', () => {
				components[0].components[0].setDisabled(true);
				components[0].components[1].setDisabled(true);
				msg.edit({ components });
			});
	}, 
	contextRun: async (d: ContextData) => {
		let activities = (d.int.targetMember as GuildMember).presence?.activities;
		if (!activities || !activities!?.some(({ name }) => name === 'Spotify'))
			return d.lappy.sendError({ ...d, ephemeral: true }, d.int, 'No Music', `${(d.int.targetMember as GuildMember).user.id === d.int.user.id ? 'u aren\'t' : 'This user isn\'t'} listening anything or I can't see it`, d.int.user);
		let activity = activities!?.find(({ name }) => name === 'Spotify'), 
			track = (await d.lappy.spotify.search({ q: activity!?.details, type: 'track'}))?.tracks.items
				.find((item: any) => item.name === activity?.details && (item.artists.every(({ name }) => activity?.state?.includes(name))));
		if (!track) 
			return d.lappy.sendError({ ...d, ephemeral: true }, d.int, 'not found', `I couldn't find the song ['${activity.details ?? 'unknown'}']`, d.int.user);
		let embeds = d.lappy.makeEmbeds(d, {
			title: `${d.lappy.emotes.spotify} | What does ${(d.int.targetMember as GuildMember).user.id === d.int.user.id ? 'u' : (d.int.targetMember as GuildMember).displayName} listen to?`,
			description: `**Song** :: [${track.name}](${track.external_urls.spotify})
**Artists** :: ${track.artists.map((art: any) => `[${art.name}](${art.external_urls.spotify})`).join(' | ')}
**${track.album.type.toTitleCase()}** :: [${track.album.name}](${track.album.external_urls.spotify})
**Duration** :: ${parse(Date.now() - activity?.timestamps?.start)} / ${parse(track.duration_ms)}
**Explicit** :: ${track.explicit ? 'Yes' : 'No'}

[Click here to listen a preview](${track.preview_url})`,
			thumbnail: { url: track.album.images[0].url }
		}), components = [new ActionRowBuilder()], lyrics = await axios.get('https://makeitpersonal.co/lyrics', {
			params: {
				artist: track.artists[0].name,
				title: track.name
			}
		}).catch(() => {});
		lyrics &&= lyrics.data;
		components[0].setComponents(
			new ButtonBuilder().setCustomId('songThumbnail').setLabel('Get Thumbnail').setStyle(1),
			new ButtonBuilder().setCustomId('songLyrics').setLabel('Get Lyrics').setStyle(1).setDisabled(!lyrics)
		);
		const msg = await d.int.reply({ embeds, components });
		msg.createMessageComponentCollector({
			filter: ({ customId }) => ['songThumbnail', 'songLyrics'].includes(customId), 
			componentType: 2 as any,
			time: 6e4
		})
			.on('collect', (i: ButtonInteraction) => {
				if (i.customId === 'songLyrics' && !!lyrics) {
					let chunkedLyrics = lyrics.trim().split(/\n/).chunk(20);
					chunkedLyrics = chunkedLyrics.map((chunk: string[], index: number) => d.lappy.makeEmbeds(d, {
						title: `:musical_score: | Lyrics - ${track.name}`,
						description: `${chunk.join('\n').toCodeBlock()}\n\n**Page ${index + 1} of ${chunkedLyrics.length}**`,
						thumbnail: { url: track.album.images[0].url } 
					})[0])
					return d.lappy.util.paginator(d, i, chunkedLyrics, 6e4, true);
				};
				let data = { ...d, int: i, track };
				d.lappy.cmds.button.get('song_thumbnail').run(data);
			})
			.on('end', () => {
				components[0].components[0].setDisabled(true);
				components[0].components[1].setDisabled(true);
				d.int.editReply({ embeds, components });
			});
	}
};