import { Data, Database, DatabaseOptions, RawData } from 'dbdjs.db';
export class DB extends Database {
	main: string;
	constructor (options: DatabaseOptions, main: string) {
		super(options);
		this.main = main
	};
	// @ts-ignore
	public async set (name: string, id: string, value: any, ttl: number | undefined = void 0, table: string = 'main'): Promise<boolean>  {
		return super.set(table, (`${name}_${id}`).toUpperCase(), value, ttl);
	};
	public async add (name: string, id: string, value: any = 1, def: number = 0, ttl: number | undefined = void 0, table: string = 'main'): Promise<boolean> {
		let old = await this.get(name, id, def, table) ?? 0;
		return await this.set(name, id, old + value, ttl, table);
	};
	// @ts-ignore
	public async get (type: string, id: string, def: any = void 0, table: string = 'main'): Promise<Data | undefined> {
		return (await super.get(table, (`${type}_${id}`).toUpperCase()))?.value ?? def;
	};
	// @ts-ignore
	public async delete (name: string, id: string | number, table: string = this.main): Promise<boolean> {
		return await super.delete(table, (`${name}_${id}`).toUpperCase());
	};
	// @ts-ignore
	public async all (table: string = this.main): Promise<Array<RawData>> {
		return await super.all(table);
	};
	public async has (filter: Function | any, table: string = this.main): Promise<boolean> {
		return (await this.all(table)).some(filter);
	};
};
