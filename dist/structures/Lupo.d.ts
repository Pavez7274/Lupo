import { Client, User, ActionRow, Message, APIEmbed } from 'discord.js';
export declare class Lupo extends Client {
    [index: string]: any;
    emotes: {
        error: string;
        feli: string;
        tofu: string;
        keyboard: string;
    };
    constructor();
    commands(): Lupo;
    events(): Lupo;
    start(): Lupo;
    permsError(data: any, instance: any, perms: string[], target?: User): Message;
    sendError(data: any, instance: any, type: string | undefined, msg: string | undefined, target?: User, components?: ActionRow<any>[] | void[], content?: string): Message;
    makeEmbeds(data: any, ...embeds: APIEmbed[] | object[]): APIEmbed[];
}
//# sourceMappingURL=Lupo.d.ts.map