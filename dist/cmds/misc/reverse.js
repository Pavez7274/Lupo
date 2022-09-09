"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'reverse',
        'invert'
    ],
    fields: [{
            name: 'text',
            type: 'string',
            req: true
        }],
    desc: 'invert a text',
    type: 'default',
    run: (d) => {
        d.msg.reply(d.args.string().split('').reverse().join(''));
    }
};
//# sourceMappingURL=reverse.js.map