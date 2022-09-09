"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.type = exports.name = void 0;
exports.name = 'searchNoResult';
exports.type = 'music';
function run(lappy, msg) {
    lappy.sendError(msg, msg, 'Not Found', 'I couldn\'t find that song');
}
exports.run = run;
;
//# sourceMappingURL=searchNoResult.js.map