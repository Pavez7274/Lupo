import { Message } from 'discord.js';
export declare const names: string[];
export declare const dev = 1;
export declare const desc = "evaluate javascript, typescript or coffeescript code via `eval()`, `TS.transpile()` or `Coffee.compile`";
export declare const type = "default";
export declare const fields: {
    name: string;
    type: string;
    req: boolean;
}[];
export declare function run(d: any): Promise<Message | void>;
//# sourceMappingURL=eval.d.ts.map