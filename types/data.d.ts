import { Lupo } from '../src/structures/Lupo';
import { Arguments } from '../src/structures/Arguments';
import { Guild, GuildMember, Message, TextChannel, User, UserContextMenuCommandInteraction } from 'discord.js';
import * as Util from '../src/util/index'
export interface Msg extends Message {
	channel: TextChannel;
	guild: Guild;
	member: GuildMember;
};
export interface Data extends Util {
	command: object[];
	prefixes: string[];
	lappy: Lupo;
	author: User;
	memb: GuildMember;
	args: Arguments;
	cmd: string;
	msg: Message;
	ch: TextChannel;
	gd: gd;
};
export interface ContextData {
	int: UserContextMenuCommandInteraction, 
	lappy: Lupo
};