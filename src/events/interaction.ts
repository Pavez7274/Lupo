// imports 
import { Interaction } from 'discord.js';
import { Lupo } from '../structures/Lupo';

export const name = 'interactionCreate';
export const type = 'dsc';
export async function run (lappy: Lupo, int: Interaction): Promise<any> {
	if (int.type == 2) {
		let cmd = await lappy.cmds.default.find((cmd: any) => cmd.names.includes(int.commandName.split(/_/g)[0]) || cmd?.context === int.commandName);
		if (!cmd || !cmd.contextRun) return int.deferReply();
		return cmd.contextRun({ lappy, int });
	};
};