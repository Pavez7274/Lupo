"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Arguments = void 0;
const isBoolean_1 = require("../util/isBoolean");
class Arguments extends String {
    all_args;
    args;
    ends;
    msg;
    prefix;
    constructor(s, t) {
        super(s.content), this.prefix = t, this.msg = s, this.all_args = this.slice(t.length).trim().split(/ +/g), this.args = this.all_args.filter(s => !s.startsWith("--")), this.ends = this.all_args.filter(s => s.startsWith("--"))
    }
    get(s) {
        return this.args?.["last" === s ? this.length - 1 : s] || void 0
    }
    get len() {
        return this.args.length
    }
    string(s = 0, t = " ") {
        return (s ? this.all_args : this.args).join(t)
    }
    shift() {
        var s = this.args.shift(),
            t = this.all_args.indexOf(s);
        return -1 !== t && this.all_args.splice(t, 1), s
    }
    pop() {
        var s = this.args.pop(),
            t = this.all_args.indexOf(s);
        return -1 !== t && this.all_args.splice(t, 1), s
    }
    endIsTrue(t, s = !1) {
        var e = this.ends.find(s => s.toLowerCase().startsWith("--" + t.toLowerCase()));
        return e ? new RegExp(`--${t}(=(true|yes|1)|)`, "gi").test(e) : s
    }
    endIsFalse(t, s = !1) {
        var e = this.ends.find(s => s.toLowerCase().startsWith("--" + t.toLowerCase()));
        return e ? new RegExp(`--${t}=(false|no|0)`, "gi").test(e) : s
    }
    getEndValue(t) {
        let s = this.ends.find(s => new RegExp(t, "gi").test(s));
        var e;
        if (s) return e = s.split(/=/g).slice(1).join("="), (0, isBoolean_1.isBoolean)(e) ? (0, isBoolean_1.parse)(e) : isNaN(Number(e)) ? e : Number(e)
    }
}
exports.Arguments = Arguments;