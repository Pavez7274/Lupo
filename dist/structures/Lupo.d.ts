import { Client, User, ActionRow, Message, APIEmbed } from 'discord.js';
import * as util from '../util/index';
import { Neko } from './Neko';
export declare class Lupo extends Client {
    [index: string]: any;
    emotes: {
        error: string;
        feli: string;
        tofu: string;
        keyboard: string;
        luv: string;
        spotify: string;
    };
    spotify: any;
    neko: Neko;
    util: typeof util;
    constructor();
    commands(): Lupo;
    events(): Lupo;
    start(): Lupo;
    permsError(data: any, instance: any, perms: string[], target?: User): Message;
    sendError(data: any, instance: any, type: string | undefined, msg: string | undefined, target?: User, components?: ActionRow<any>[] | void[], content?: string): Promise<Message>;
    makeEmbeds(data: any, ...embeds: APIEmbed[] | object[]): APIEmbed[];
}
//# sourceMappingURL=Lupo.d.ts.map