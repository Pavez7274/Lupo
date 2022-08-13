// imports 
import * as axios from 'axios';
import { Lupo } from './Lupo';

// interfaces
export interface NekoOptions {
	client: Lupo;
	baseURL?: string;
};
export interface ImageResult {
	anime_name: string;
	url: string;
};
export interface Result {
	results: Array<ImageResult>
};

// exports
export class Neko {
	__opts__: NekoOptions;
	baseURL: string;
	client: Lupo;
	axios = axios as any;
	imgs = [
  	'baka',     'bite',     'blush',
  	'bored',    'cry',      'cuddle',
  	'dance',    'facepalm', 'feed',
  	'handhold', 'happy',    'highfive',
  	'hug',      'kick',     'kiss',
  	'laugh',    'pat',      'poke',
  	'pout',     'punch',    'shoot',
  	'shrug',    'slap',     'sleep',
  	'smile',    'smug',     'stare',
  	'think',    'thumbsup', 'tickle',
  	'wave',     'wink',     'yeet'
	]
	constructor (options: NekoOptions) {
		this.__opts__ = options;
		this.baseURL = options.baseURL ?? 'https://nekos.best/api/v2/';
		this.client = options.client
	};
	async get (path: string): Promise<object> {
		return (await this.axios.get(this.baseURL.concat(encodeURIComponent(path))))?.data ?? {};
	};
	async img (nya: string | number): Promise<any> {
		return (await this.get(this.imgs?.[nya] ?? nya) as Result)?.results[0];
	};
};