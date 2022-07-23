import { Lupo } from './Lupo';
export interface NekoOptions {
    client: Lupo;
    baseURL?: string;
}
export declare class Neko {
    __opts__: NekoOptions;
    baseURL: string;
    client: Lupo;
    axios: any;
    imgs: string[];
    constructor(options: NekoOptions);
    get(path: string): Promise<object>;
    img(nya: string): Promise<any>;
}
//# sourceMappingURL=Neko.d.ts.map