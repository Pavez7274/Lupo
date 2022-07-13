import { Lupo } from '../src/structures/Lupo';
import { Arguments } from '../src/structures/Arguments';
import { Guild, GuildMember, Message, TextChannel, User } from 'discord.js';
export interface gd extends Guild {
	me: GuildMember;
};
export interface Msg extends Message {
	channel: TextChannel;
	guild: gd;
	member: GuildMember;
};
export interface Data {
	command: object[];
	prefixes: string[];
	lappy: Lupo;
	author: User;
	memb: GuildMember;
	args: Arguments;
	cmd: string;
	msg: Message;
	ch: TextChannel;
	gd: gd
};