"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.type = exports.names = void 0;
exports.names = [
    'ping'
];
exports.type = 'default';
function run(d) {
    d.msg.reply(`${d.lappy.ws.ping ?? 'WS_ERROR'}Ms`);
}
exports.run = run;
;
//# sourceMappingURL=ping.js.map