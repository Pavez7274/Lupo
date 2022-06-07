"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.type = exports.name = void 0;
exports.name = 'ready';
exports.type = 'dsc';
function run() {
    const date = new Date(Date.now())
        .toLocaleString('en-gb', {
        timeZone: 'America/Mendoza'
    });
    console.log('* [client] :: Ready at ', date);
}
exports.run = run;
;
//# sourceMappingURL=ready.js.map