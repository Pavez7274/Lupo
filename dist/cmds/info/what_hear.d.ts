import { Data, ContextData } from '../../../types/data';
declare const _default: {
    names: string[];
    context: string;
    fields: {
        name: string;
        type: string;
        req: boolean;
    }[];
    description: string;
    type: string;
    run: (d: Data) => Promise<any>;
    contextRun: (d: ContextData) => Promise<import("discord.js").Message<boolean> | undefined>;
};
export default _default;
//# sourceMappingURL=what_hear.d.ts.map