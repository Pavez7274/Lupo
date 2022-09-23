import { Message } from 'discord.js';
export declare class Arguments extends String {
    _args: Array<string>;
    args: Array<string>;
    ends: Array<string>;
    msg: Message;
    prefix: string;
    parsedContent: string;
    constructor(msg: Message, prefix: string);
    get(index: number): string;
    isNatural(index: number, negatives?: boolean): boolean;
    isNumber(index: number, negative?: boolean): boolean;
    get len(): number;
    string(all?: boolean | number, sep?: string): string;
    shift(): string | undefined;
    pop(): string | undefined;
    endIsTrue(name: string, def?: boolean): boolean;
    endIsFalse(name: string, def?: boolean): boolean;
    getEndValue(name: string): any;
}
//# sourceMappingURL=Arguments.d.ts.map