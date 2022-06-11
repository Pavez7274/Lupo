import { Message, Guild, TextChannel, GuildMember } from 'discord.js';
import { Lupo } from '../structures/Lupo';
interface gd extends Guild {
    me: GuildMember;
}
interface Msg extends Message {
    channel: TextChannel;
    guild: gd;
    member: GuildMember;
}
export declare const name = "messageCreate";
export declare const type = "dsc";
export declare function run(lappy: Lupo, msg: Msg): Promise<any | void>;
export {};
//# sourceMappingURL=msg.d.ts.map