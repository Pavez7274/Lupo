"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const dbdjs_db_1 = require("dbdjs.db");
class DB extends dbdjs_db_1.Database {
    main;
    constructor(options, main) {
        super(options);
        this.main = main;
    }
    ;
    async set(name, id, value, ttl = void 0, table = 'main') {
        return super.set(table, (`${name}_${id}`).toUpperCase(), value, ttl);
    }
    ;
    async add(name, id, value = 1, def = 0, ttl = void 0, table = 'main') {
        let old = await this.get(name, id, def, table) ?? 0;
        return await this.set(name, id, old + value, ttl, table);
    }
    ;
    async get(type, id, def = void 0, table = 'main') {
        return (await super.get(table, (`${type}_${id}`).toUpperCase()))?.value ?? def;
    }
    ;
    async delete(name, id, table = this.main) {
        return await super.delete(table, (`${name}_${id}`).toUpperCase());
    }
    ;
    async all(table = this.main) {
        return await super.all(table);
    }
    ;
    async has(filter, table = this.main) {
        return (await this.all(table)).some(filter)?.length;
    }
    ;
}
exports.DB = DB;
;
//# sourceMappingURL=DataBase.js.map