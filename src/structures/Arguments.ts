// imports
import { Message } from 'discord.js';
import { isBoolean, parse } from '../util/isBoolean';

export class Arguments extends String {
	_args: Array<string>;
	args: Array<string>;
	ends: Array<string>;
	msg: Message;
	prefix: string;
	parsedContent: string;
	constructor (msg: Message, prefix: string) {
		super(msg.content);
		this.prefix = prefix;
  	this.msg = msg;
    this.parsedContent = this
      .slice(prefix.length)
      .trim()
    this.ends = this.parsedContent.match(/--(\w+)(=(".*?"|.)|)/gim) ?? [];
    this._args = this.parsedContent.split(/ +/g);
    this.args = this.parsedContent
			.replace(/--(\w+)=".*?"/gim, '--$1=ValueInQuotes')
			.split(/ +/g)
			.filter((arg: string) => !arg.startsWith('--'));
	};
	public get (index: number | string): string {
		return this.args?.[index === 'last' ? this.length - 1 : index] || void 0;
	};
	get len (): number {
		return this.args.length;
	};
	public string (all: boolean | number = 0, sep: string = ' '): string {
		return all ? this._args.join(sep) : this.args.join(sep);
	};
	public shift (): string | undefined {
		const shifted = this.args.shift(),
			// @ts-ignore
			index = this._args.indexOf(shifted);
		if (index === -1) return shifted;
		// @ts-ignore
		this._args.splice(index, 1);
		return shifted;
	};
	public pop (): string | undefined {
		const poped = this.args.pop(),
			// @ts-ignore
			index = this._args.indexOf(poped);
		if (index === -1) return poped;
		// @ts-ignore
		this._args.splice(index, 1);
		return poped;
  };
	endIsTrue (name: string, def: boolean = false): boolean {
		let end = this.ends.find((end) => new RegExp(`--${name}`, 'gi').test(end));
		if (!end) return def;
		return (new RegExp(`--${name}(=(true|yes|1)|)`, 'gi')).test(end);
		// return this.ends.some((end: string) => (new RegExp(`--${name}(=(true|yes|1)|)`, 'gi')).test(end));
	};
	endIsFalse (name: string, def: boolean = false): boolean {
		let end = this.ends.find((end) => new RegExp(`--${name}`, 'gi').test(end));
		if (!end) return def;
		return (new RegExp(`--${name}=(false|no|0)`, 'gi')).test(end);
	};
	getEndValue (name: string): any {
		let end = this.ends.find((End: string) => (new RegExp(name, 'gi')).test(End));
		if (!end) 
			return void 0;
		let value = end.split(/=/g).slice(1).join('=');
		if (isBoolean(value))
			return parse(value);
		if (value.endsWith('n') && !!BigInt(value.slice(0, -1)))
			return BigInt(value.slice(0, -1))
		if (!isNaN(Number(value)))
			return Number(value);
		if (value.startsWith('"') && value.endsWith('"'))
			return value.slice(1, -1);
		return value
	};
};