// imports 
import { CustomPlugin, DisTubeError, Song, Playlist } from 'distube';
import * as parser from 'bandcamp-scraper/lib/htmlParser';
import * as axios from 'axios';

// types
import type { VoiceBasedChannel } from 'discord.js';
import type { Queue, PlayOptions } from 'distube'; 

// utils
function IDontHaveANameForThis (data, url) {
	let obj;
	try {
		obj = parser.parseTrackInfo(data, url);
	} catch {};
	try {
		obj = parser.parseAlbumInfo(data, url);
	} catch {}
	try {
		obj = parser.parseArtistInfo(data, url);
	} catch {}
	return obj && Object.values(obj).some((n: any) => Boolean(Array.isArray(n) ? n.length : n));
};

// exports 
export class BandcampPlugin extends CustomPlugin {
	constructor () { super() };
	async validate (url: string): Promise<boolean> {
		/*if (typeof url != 'string' ||
				!url.includes('.bandcamp.com/') ||
				!['track', 'album'].includes(url.split('/').at(3))
			 ) return false;*/
		if (typeof url != 'string' || !/http(s|):\/\/\w+\.bandcamp\.com/gi.test(url))
			return false;
		try {
			const req = await axios.get(url);
			if (!req || !req.data) return false;
			return !!IDontHaveANameForThis(req.data, url);
		} catch {
			return false;
		};
	};
	async play (channel: VoiceBasedChannel, url: string, opt: PlayOptions): Promise<void> {
		let type = url.split('/').at(3);
		if (type == 'track') {
			const data = parser.parseTrackInfo((await axios.get(url)).data, url);
			let result = (await this.distube.search(`${url.split(/\/\//g)[1].split('.')[0]} ${data.title}`))?.at(0);
			if (!result) throw new DisTubeError('BANDCAMP_PLUGIN_NO_RESULT', `Couldn't find "${data.title}" on YouTube`);
			result.source = 'bandcamp';
			await this.distube.play(channel, result, opt);
		} else if (type == 'album') {
			const { member, metadata } = opt,
				data = parser.parseAlbumInfo((await axios.get(url)).data, url);
			let tracks = [];
			for (let track of data.tracks) {
				let result = (await this.distube.search(`${track.name} ${data.artist}`, { limit: 1 })).at(0);
				if (!result) continue;
				result = new Song(result, { member, metadata });
				// result.source = 'bandcamp';
				tracks.push(result);
			};
			let info = {
				thumbnail: data.imageUrl,
				source: 'bandcamp',  
				name: data.name,
				url: data.url,
				songs: tracks,
				member 
			}, playlist = new Playlist(info, { member, metadata});
			this.distube.play(channel, playlist, opt); 
		} else {
			const { member, metadata } = opt, 
				data = parser.parseArtistInfo((await axios.get(url)).data, url);
			for (let i = 0; i < data.albums.length; i++) {
				let rq = await axios.get(data.albums[i].url), 
					josecito = parser.parseAlbumInfo(rq.data, data.albums[i].url);
				josecito = josecito.map((a: any) => `${a.name} ${data.name}`);
				data.albums[i] = josecito;
			};
			let songs = data.albums
				.reduce((a: string[], b: string[]) => a.concat(b))
				.map(async (a: string) => (await this.distube.search(a, { limit: 1 })).at(0))
				.filter((a: any) => Boolean(a))
				.map((a: any) => new Song(a, { member, metadata })), 
				info = {
					thumbnail: data.coverImage, 
					source: 'bandcamp', 
					name: `Discography of ${data.name}`,
					url: data.url, 
					member, 
					songs, 
				},
				playlist = new Playlist(info, { member, metadata });
			this.distube.play(channel, playlist, opt);
		};
	};
};