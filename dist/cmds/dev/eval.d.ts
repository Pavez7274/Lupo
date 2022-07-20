import { Message } from 'discord.js';
import { Data } from '../../../types/data';
export declare const names: string[];
export declare const dev = 1;
export declare const desc = "evaluate javascript, typescript, coffeescript or bash code via `eval()`, `typescript.transpile()`, `coffee.compile()` or `child_process.execSync()`";
export declare const type = "default";
export declare const fields: {
    name: string;
    type: string;
    req: boolean;
}[];
export declare function run(d: Data): Promise<Message | void>;
//# sourceMappingURL=eval.d.ts.map