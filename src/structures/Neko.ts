// imports 
import * as axios from 'axios';
import { Lupo } from './Lupo';

// interfaces
export interface NekoOptions {
	client: Lupo, 
	baseURL?: string;
}

// exports 
export class Neko {
	__opts__: NekoOptions;
	baseURL: string;
	client: Lupo;
	axios = axios as any;
	imgs = [
		'smug', 'woof',
		'gasm', '8ball',
		'goose', 'cuddle',
		'avatar', 'slap',
		'v3', 'pat', 'gecg',
		'feed', 'fox_girl',
		'lizard', 'neko',
		'hug', 'meow', 'kiss',
		'wallpaper', 'tickle',
		'spank', 'waifu',
		'lewd', 'ngif'
	]
	constructor (options: NekoOptions) {
		this.__opts__ = options;
		this.baseURL = options.baseURL ?? 'http://pavez.glitch.me/neko/';
		this.client = options.client
	};
	async get (path: string): Promise<object> {
		return (await this.axios.get(this.baseURL.concat(encodeURIComponent(path))))?.data ?? {};
	};
	async img (nya: string): Promise<any> {
		return await this.get(`v2/img/${nya}`);
	};
};