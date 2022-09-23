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
    constructor(s, t) {
        super(s.content), this.prefix = t, this.msg = s, this.parsedContent = this.slice(t.length).trim(), this.ends = this.parsedContent.match(/--(\w+)(=(".*?"|.)|)/gim) ?? [], this._args = this.parsedContent.split(/ +/g), this.args = this.parsedContent.replace(/--(\w+)=".*?"/gim, "--$1=ValueInQuotes").split(/ +/g).filter(s => !s.startsWith("--"))
    }
    get(s) {
        return this.args.at(s) || void 0
    }
    isNatural(s, t = !0) {
        return s = Number(this.args.at(s)), !isNaN(s) && Math.floor(s) == s && (t || 0 <= s)
    }
    isNumber(s, t = !0) {
        return s = Number(this.arg.at(s)), !isNaN(s) && (t || 0 <= s)
    }
    get len() {
        return this.args.length
    }
    string(s = 0, t = " ") {
        return (s ? this._args : this.args).join(t)
    }
    shift() {
        var s = this.args.shift(),
            t = this._args.indexOf(s);
        return -1 !== t && this._args.splice(t, 1), s
    }
    pop() {
        var s = this.args.pop(),
            t = this._args.indexOf(s);
        return -1 !== t && this._args.splice(t, 1), s
    }
    endIsTrue(t, s = !1) {
        var e = this.ends.find(s => new RegExp("--" + t, "gi").test(s));
        return e ? new RegExp(`--${t}(=(true|yes|1)|)`, "gi").test(e) : s
    }
    endIsFalse(t, s = !1) {
        var e = this.ends.find(s => new RegExp("--" + t, "gi").test(s));
        return e ? new RegExp(`--${t}=(false|no|0)`, "gi").test(e) : s
    }
    getEndValue(t) {
        let e = this.ends.find(s => new RegExp(t, "gi").test(s));
        if (e) {
            let s = e.split(/=/g).slice(1).join("=");
            return (0, isBoolean_1.isBoolean)(s) ? (0, isBoolean_1.parse)(s) : s.endsWith("n") && BigInt(s.slice(0, -1)) ? BigInt(s.slice(0, -1)) : isNaN(Number(s)) ? s.startsWith('"') && s.endsWith('"') ? s.slice(1, -1) : s : Number(s)
        }
    }
}
exports.Arguments = Arguments;