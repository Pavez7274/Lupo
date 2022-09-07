"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Arguments = void 0;
const isBoolean_1 = require("../util/isBoolean");
class Arguments extends String {
    _args;
    args;
    ends;
    msg;
    prefix;
    parsedContent;
    constructor(s, e) {
        super(s.content), this.prefix = e, this.msg = s, this.parsedContent = this.slice(e.length).trim(), this.ends = this.parsedContent.match(/--(\w+)(=(".*?"|.)|)/gim) ?? [], this._args = this.parsedContent.split(/ +/g), this.args = this.parsedContent.replace(/--(\w+)=".*?"/gim, "--$1=ValueInQuotes").split(/ +/g).filter(s => !s.startsWith("--"))
    }
    get(s) {
        return this.args?.["last" === s ? this.length - 1 : s] || void 0
    }
    get len() {
        return this.args.length
    }
    string(s = 0, e = " ") {
        return (s ? this._args : this.args).join(e)
    }
    shift() {
        var s = this.args.shift(),
            e = this._args.indexOf(s);
        return -1 !== e && this._args.splice(e, 1), s
    }
    pop() {
        var s = this.args.pop(),
            e = this._args.indexOf(s);
        return -1 !== e && this._args.splice(e, 1), s
    }
    endIsTrue(e, s = !1) {
        var t = this.ends.find(s => new RegExp("--" + e, "gi").test(s));
        return t ? new RegExp(`--${e}(=(true|yes|1)|)`, "gi").test(t) : s
    }
    endIsFalse(e, s = !1) {
        var t = this.ends.find(s => new RegExp("--" + e, "gi").test(s));
        return t ? new RegExp(`--${e}=(false|no|0)`, "gi").test(t) : s
    }
    getEndValue(e) {
        let t = this.ends.find(s => new RegExp(e, "gi").test(s));
        if (t) {
            let s = t.split(/=/g).slice(1).join("=");
            return (0, isBoolean_1.isBoolean)(s) ? (0, isBoolean_1.parse)(s) : s.endsWith("n") && BigInt(s.slice(0, -1)) ? BigInt(s.slice(0, -1)) : isNaN(Number(s)) ? s.startsWith('"') && s.endsWith('"') ? s.slice(1, -1) : s : Number(s)
        }
    }
}
exports.Arguments = Arguments;