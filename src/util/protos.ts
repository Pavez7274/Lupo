// genshin reference??
// imports
import { escapeCodeBlock } from 'discord.js';
import { random } from './random';

// strings 
String.prototype.toTitleCase = function (): string {
	return this.replace(/\w+/gim, (word: string) => word.toLowerCase().replace(word[0].toLowerCase(), word[0].toUpperCase()));
};

String.prototype.toCodeBlock = function (lang: string | String = ''): string {
	return `\`\`\`${lang}\n${escapeCodeBlock(this as string)}\n\`\`\``
};

const faces = [
	'uwu', 
	'owo', 
	'>w<', 
	'^w^', 
	'uvu', 
	'ovo', 
	'>v<'
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

// arrays
Array.prototype.random = function (): any {
	return this[random(this.length - 1)];
};

Array.prototype.addAt = function (position: number, ...items: any) {
	return this.splice(position, 0, ...items);
};