import { Client, User, MessageActionRow, MessageEmbed, Message } from 'discord.js';
export declare class Lupo extends Client {
    [index: string]: any;
    constructor();
    commands(): Lupo;
    events(): Lupo;
    start(): Lupo;
    permsError(data: any, instance: any, perms: Array<string>, target?: User): Message;
    sendError(data: any, instance: any, type: string | void, msg: string, target?: User, components?: Array<MessageActionRow | void>, content?: string): Message;
    makeEmbeds(data: any, ...embeds: Array<object>): Array<MessageEmbed>;
}
//# sourceMappingURL=Lupo.d.ts.map