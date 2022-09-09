"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    names: [
        'ping'
    ],
    desc: 'returns my latency',
    type: 'default',
    run: (d) => {
        d.msg.reply(`${d.lappy.ws.ping ?? 'WS_ERROR'}m/s`);
    }
};
//# sourceMappingURL=ping.js.map