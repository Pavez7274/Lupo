// imports 
import { CustomPlugin, DisTubeError } from 'distube';
import * as parser from 'bandcamp-scraper/lib/htmlParser';
import * as axios from 'axios';

// types
import type { VoiceBasedChannel } from 'discord.js';
import type { Queue, PlayOptions} from 'distube'; 

// exports 
export class BandcampPlugin extends CustomPlugin {
	constructor () { super() };
	async validate (url: string): Promise<boolean> {
		if (typeof url != 'string' || !url.includes('.bandcamp.com/track/')) return false;
		try {
			const req = await axios.get(url);
			if (!req || !req.data) return false;
			return true;
		} catch {
			return false;
		};
	};
	async play (channel: VoiceBasedChannel, url: string, opt: PlayOptions): Promise<void>{
		const data = parser.parseTrackInfo((await axios.get(url)).data, url);
		let result = (await this.distube.search(`${url.split(/\/\//g)[1].split('.')[0]} ${data.title}`))?.at(0);
		if (!result) throw new DisTubeError('BANDCAMP_PLUGIN_NO_RESULT', `Couldn't find "${data.title}" on YouTube`);
		await this.distube.play(channel, result, opt);
	};
};