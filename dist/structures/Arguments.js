"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arguments = void 0;
class Arguments extends String {
    all_args;
    args;
    ends;
    msg;
    prefix;
    _ends;
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
        this._ends = [];
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
}
exports.Arguments = Arguments;
;
//# sourceMappingURL=Arguments.js.map