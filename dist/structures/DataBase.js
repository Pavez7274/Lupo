"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DB = void 0;
const dbdjs_db_1 = require("dbdjs.db");
class DB extends dbdjs_db_1.Database {
    main;
    constructor(e, s) {
        super(e), this.main = s
    }
    async set(e, s, t, a = void 0, r = "main") {
        return super.set(r, (e + "_" + s).toUpperCase(), t, a)
    }
    async add(e, s, t = 1, a = 0, r = void 0, i = "main") {
        return a = await this.get(e, s, a, i) ?? 0, this.set(e, s, a + t, r, i)
    }
    async get(e, s, t = void 0, a = "main") {
        return (await super.get(a, (e + "_" + s).toUpperCase()))?.value ?? t
    }
    async delete(e, s, t = this.main) {
        return super.delete(t, (e + "_" + s).toUpperCase())
    }
    async all(e = this.main) {
        return super.all(e)
    }
    async has(e, s = this.main) {
        return (await this.all(s)).some(e)?.length
    }
}
exports.DB = DB;