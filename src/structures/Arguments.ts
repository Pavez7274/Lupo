// imports
import { Message } from 'discord.js';
import { isBoolean, parse } from '../util/isBoolean';

export class Arguments extends String {
	all_args: Array<string>;
	args: Array<string>;
	ends: Array<string>;
	msg: Message;
	prefix: string;
	constructor (msg: Message, prefix: string) {
		super(msg.content);
		this.prefix = prefix;
  	this.msg = msg;
    this.all_args = this
      .slice(prefix.length)
        .trim()
        .split(/ +/g);
    this.args = this.all_args.filter((arg: string) => !arg.startsWith('--'));
    this.ends = this.all_args.filter((arg: string) => arg.startsWith('--'));
	};
	public get (index: number | string): string {
		return this.args?.[index === 'last' ? this.length - 1 : index] || void 0;
	};
	get len (): number {
		return this.args.length;
	};
	public string (all: boolean | number = 0, sep: string = ' '): string {
		return all ? this.all_args.join(sep) : this.args.join(sep);
	};
	public shift (): string | undefined {
		const shifted = this.args.shift(),
			// @ts-ignore
			index = this.all_args.indexOf(shifted);
		if (index === -1) return shifted;
		// @ts-ignore
		this.all_args.splice(index, 1);
		return shifted;
	};
	public pop (): string | undefined {
		const poped = this.args.pop(),
			// @ts-ignore
			index = this.all_args.indexOf(poped);
		if (index === -1) return poped;
		// @ts-ignore
		this.all_args.splice(index, 1);
		return poped;
  };
	endIsTrue (name: string): boolean {
		return this.ends.some((end: string) => (new RegExp(`${name}(=(true|yes|1)|)`, 'gi')).test(end));
	};
	endIsFalse (name: string): boolean {
		return this.ends.some((end: string) => (new RegExp(`${name}=(false|no|0)`, 'gi')).test(end));
	};
	getEndValue (name: string): any {
		let end = this.ends.find((End: string) => (new RegExp(name, 'gi')).test(End));
		if (!end) 
			return void 0;
		let value = end.split(/=/g).slice(1).join('=');
		if (isBoolean(value))
			return parse(value);
		if (!isNaN(Number(value)))
			return Number(value);
		return value
	};
};