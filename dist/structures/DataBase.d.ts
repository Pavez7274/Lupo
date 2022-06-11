import { Data, Database, DatabaseOptions, RawData } from 'dbdjs.db';
export declare class DB extends Database {
    main: string;
    constructor(options: DatabaseOptions, main: string);
    set(type: string, id: string, value: any, ttl?: number | undefined, table?: string): Promise<boolean>;
    get(type: string, id: string, def?: any, table?: string): Promise<Data | undefined>;
    delete(type: string, id: string | number, table?: string): Promise<boolean>;
    all(table?: string): Promise<Array<RawData>>;
    has(filter: Function | any, table?: string): Promise<boolean>;
}
//# sourceMappingURL=DataBase.d.ts.map