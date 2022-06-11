import { Message } from 'discord.js';
export declare class Arguments extends String {
    all_args: Array<string>;
    args: Array<string>;
    ends: Array<string>;
    msg: Message;
    prefix: string;
    constructor(msg: Message, prefix: string);
    get(index: number | string): string;
    get length(): number;
    string(all?: boolean | number, sep?: string): string;
    shift(): string | undefined;
    pop(): string | undefined;
}
//# sourceMappingURL=Arguments.d.ts.map