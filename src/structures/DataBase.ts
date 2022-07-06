import { Data, Database, DatabaseOptions, RawData } from 'dbdjs.db';
export class DB extends Database {
	main: string;
	constructor (options: DatabaseOptions, main: string) {
		super(options);
		this.main = main
	};
	// @ts-ignore
	public async set (type: string, id: string, value: any, ttl: number | undefined = void 0, table: string = 'main'): Promise<boolean>  {
		return super.set(table, (`${type}_${id}`).toUpperCase(), value, ttl);
	};
	// @ts-ignore
	public async get (type: string, id: string, def: any = void 0, table: string = 'main'): Promise<Data | undefined> {
		return (await super.get(table, (`${type}_${id}`).toUpperCase()))?.value ?? def;
	};
	// @ts-ignore
	public async delete (type: string, id: string | number, table: string = this.main): Promise<boolean> {
		return await super.delete(table, (type + '_' + id).toUpperCase());
	};
	// @ts-ignore
	public async all (table: string = this.main): Promise<Array<RawData>> {
		return await super.all(table);
	};
	public async has (filter: Function | any, table: string = this.main): Promise<boolean> {
		return !!(await this.all(table)).filter(filter).length;
	};
};