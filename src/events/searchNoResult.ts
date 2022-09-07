// imports
import { Lupo } from '../structures/Lupo';
import { Message } from 'discord.js';

// exports 
export const name = 'searchNoResult';
export const type = 'music';
export function run (lappy: any, msg: Message): void {
	lappy.sendError(msg, msg, 'Not Found', 'I couldn\'t find that song');
};