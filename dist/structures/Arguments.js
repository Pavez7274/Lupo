"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arguments = void 0;
const isBoolean_1 = require("../util/isBoolean");
class Arguments extends String {
    _args;
    args;
    ends;
    msg;
    prefix;
    parsedContent;
    constructor(msg, prefix) {
        super(msg.content);
        this.prefix = prefix;
        this.msg = msg;
        this.parsedContent = this
            .slice(prefix.length)
            .trim();
        this.ends = this.parsedContent.match(/--(\w+)(=(".*?"|.)|)/gim) ?? [];
        this._args = this.parsedContent.split(/ +/g);
        this.args = this.parsedContent
            .replace(/--(\w+)=".*?"/gim, '--$1=ValueInQuotes')
            .split(/ +/g)
            .filter((arg) => !arg.startsWith('--'));
    }
    ;
    get(index) {
        return this.args?.[index === 'last' ? this.length - 1 : index] || void 0;
    }
    ;
    get len() {
        return this.args.length;
    }
    ;
    string(all = 0, sep = ' ') {
        return all ? this._args.join(sep) : this.args.join(sep);
    }
    ;
    shift() {
        const shifted = this.args.shift(), index = this._args.indexOf(shifted);
        if (index === -1)
            return shifted;
        this._args.splice(index, 1);
        return shifted;
    }
    ;
    pop() {
        const poped = this.args.pop(), index = this._args.indexOf(poped);
        if (index === -1)
            return poped;
        this._args.splice(index, 1);
        return poped;
    }
    ;
    endIsTrue(name, def = false) {
        let end = this.ends.find((end) => new RegExp(`--${name}`, 'gi').test(end));
        if (!end)
            return def;
        return (new RegExp(`--${name}(=(true|yes|1)|)`, 'gi')).test(end);
    }
    ;
    endIsFalse(name, def = false) {
        let end = this.ends.find((end) => new RegExp(`--${name}`, 'gi').test(end));
        if (!end)
            return def;
        return (new RegExp(`--${name}=(false|no|0)`, 'gi')).test(end);
    }
    ;
    getEndValue(name) {
        let end = this.ends.find((End) => (new RegExp(name, 'gi')).test(End));
        if (!end)
            return void 0;
        let value = end.split(/=/g).slice(1).join('=');
        if ((0, isBoolean_1.isBoolean)(value))
            return (0, isBoolean_1.parse)(value);
        if (value.endsWith('n') && !!BigInt(value.slice(0, -1)))
            return BigInt(value.slice(0, -1));
        if (!isNaN(Number(value)))
            return Number(value);
        if (value.startsWith('"') && value.endsWith('"'))
            return value.slice(1, -1);
        return value;
    }
    ;
}
exports.Arguments = Arguments;
;
//# sourceMappingURL=Arguments.js.map