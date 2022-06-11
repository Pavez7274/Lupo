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
    async set(type, id, value, ttl = void 0, table = 'main') {
        return super.set(table, (`${type}_${id}`).toUpperCase(), value, ttl);
    }
    ;
    async get(type, id, def = void 0, table = 'main') {
        return (await super.get(table, (`${type}_${id}`).toUpperCase()))?.value ?? def;
    }
    ;
    async delete(type, id, table = this.main) {
        return await super.delete(table, (type + '_' + id).toUpperCase());
    }
    ;
    async all(table = this.main) {
        return await super.all(table);
    }
    ;
    async has(filter, table = this.main) {
        return !!(await this.all(table)).filter(filter).length;
    }
    ;
}
exports.DB = DB;
;
//# sourceMappingURL=DataBase.js.map