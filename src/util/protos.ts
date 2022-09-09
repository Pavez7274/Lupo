// genshin reference??
// imports
import { escapeCodeBlock } from 'discord.js';
import { random } from './random';

// strings
String.prototype.insensitiveIncludes = function (match: string, fromIndex: number | void): boolean {
	return this.toLowerCase().includes(match.toLowerCase(), fromIndex)
};
String.prototype.toTitleCase = function (): string {
	return this.replace(/\w\S{1,}/gim, (word: string) => word.toLowerCase().replace(word[0].toLowerCase(), word[0].toUpperCase()));
};

String.prototype.toCodeBlock = function (lang: string | String = ''): string {
	return `\`\`\`${lang}\n${escapeCodeBlock(this as string)}\n\`\`\``
};

export const faces = [
	'uwu', 
	'owo', 
	'>w<', 
	'^w^', 
	'uvu', 
	'ovo', 
	'>v<', 
	'7w7', 
	'7v7',
	'TwT',
	'TvT'
];
String.prototype.OwOIfy = function (): string {
	return this
		.replace(/([Ll])ove/g, '$1uv')
		.replace(/LOVE/g, 'WUV')
		.replace(/cat/g, 'kitteh')
		.replace(/CAT/g, 'KITTEH')
		.replace(/(do)(g)/g, '$1$2$2o')
		.replace(/(DO)(G)/g, '$1$2$2O')
		.replace(/(?:r|l)/g, 'w')
		.replace(/(?:R|L)/g, 'W')
		.replace(/(n)([aeiou])/g, '$1y$2')
		.replace(/N([AEIOU])/g, 'NY$1')
		.replace(/nd(?= |&)/g, 'ndo')
		.replace(/you/g, 'uu')
		.replace(/YOU/g, 'UU')
		.replace(/pavez/gi, 'usewess')
		.replace(/(d)(e)a(d)/gi, '$1$2$3')
		.replace(/th([Aa])([Tt])/g, 'd$1$2')
		.replace(/T[Hh]([Aa])([Tt])/g, 'D$1$2')
		.replace(/([Dd]ick|[Pp]enis)/g, 'peepee')
		.replace(/(DICK|PENIS)/g, 'PEEPEE')
		.replace(/[Tt]h(?![Ee])/g, 'f')
		.replace(/TH(?![Ee])/g, 'F')
		.replace(/[.,](?![0-9])/g, ' ' + faces.random())
		.replace(/[!;]+/g, ' ' + faces.random())
};

String.prototype.cropAt = function (at: number): string {
	return (this.length > at ? this.slice(0, at - 3).concat('...') : this) as string;
};

export const colors = {
	red: 31, 
	green: 32,
	yellow: 33,
	blue: 34,
	magenta: 35
};

String.prototype.color = function (color: string | number): string {
	return `\x1b[0m\x1b[${Number(color) ? Number(color) : colors[color]}m${this}\x1b[0m`;
};

// arrays
Array.prototype.random = function (): any {
	return this[random(this.length - 1)];
};

Array.prototype.addAt = function (position: number, ...items: any) {
	return this.splice(position, 0, ...items);
};

Array.prototype.chunk = function (limit: number) {
	for (var size = Math.ceil(this.length / limit), chunks = [], index = 0; index < size; index++)
		chunks[index] = this.splice(0, limit);
	return chunks;
};