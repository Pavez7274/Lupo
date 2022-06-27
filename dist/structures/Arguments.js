"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arguments = void 0;
const isBoolean_1 = require("../util/isBoolean");
class Arguments extends String {
    all_args;
    args;
    ends;
    msg;
    prefix;
    constructor(msg, prefix) {
        super(msg.content);
        this.prefix = prefix;
        this.msg = msg;
        this.all_args = this
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        this.args = this.all_args.filter((arg) => !arg.startsWith('--'));
        this.ends = this.all_args.filter((arg) => arg.startsWith('--'));
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
        return all ? this.all_args.join(sep) : this.args.join(sep);
    }
    ;
    shift() {
        const shifted = this.args.shift(), index = this.all_args.indexOf(shifted);
        if (index === -1)
            return shifted;
        this.all_args.splice(index, 1);
        return shifted;
    }
    ;
    pop() {
        const poped = this.args.pop(), index = this.all_args.indexOf(poped);
        if (index === -1)
            return poped;
        this.all_args.splice(index, 1);
        return poped;
    }
    ;
    endIsTrue(name) {
        return this.ends.some((end) => (new RegExp(`${name}(=(true|yes|1)|)`, 'gi')).test(end));
    }
    ;
    endIsFalse(name) {
        return this.ends.some((end) => (new RegExp(`${name}=(false|no|0)`, 'gi')).test(end));
    }
    ;
    getEndValue(name) {
        let end = this.ends.find((End) => (new RegExp(name, 'gi')).test(End));
        if (!end)
            return void 0;
        let value = end.split(/=/g).slice(1).join('=');
        if ((0, isBoolean_1.isBoolean)(value))
            return (0, isBoolean_1.parse)(value);
        if (!isNaN(Number(value)))
            return Number(value);
        return value;
    }
    ;
}
exports.Arguments = Arguments;
;
//# sourceMappingURL=Arguments.js.map