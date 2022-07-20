// imports 
import { Interaction } from 'discord.js';
import { Lupo } from '../structures/Lupo';

export const name = 'interactionCreate';
export const type = 'dsc';
export async function run (lappy: Lupo, int: Interaction): Promise<any> {
	if (int.type == 2) {
		console.log(int.type)
	};
};