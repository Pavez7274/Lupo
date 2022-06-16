"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.once = exports.type = exports.name = void 0;
exports.name = 'ready';
exports.type = 'dsc';
exports.once = true;
function run() {
    const date = new Date(Date.now()).toLocaleString('en-gb', {
        timeZone: 'America/Mendoza'
    });
    console.log('* [client] :: Ready at', date);
}
exports.run = run;
;
//# sourceMappingURL=ready.js.map