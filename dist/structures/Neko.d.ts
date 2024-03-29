import { Lupo } from './Lupo';
export interface NekoOptions {
    client: Lupo;
    baseURL?: string;
}
export interface ImageResult {
    anime_name: string;
    url: string;
}
export interface Result {
    results: Array<ImageResult>;
}
export declare class Neko {
    __opts__: NekoOptions;
    baseURL: string;
    client: Lupo;
    axios: any;
    imgs: string[];
    constructor(options: NekoOptions);
    get(path: string): Promise<object>;
    img(nya: string | number): Promise<ImageResult>;
}
//# sourceMappingURL=Neko.d.ts.map