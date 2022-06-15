"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.isBoolean = void 0;
function isBoolean(str) {
    return [
        'false',
        'true',
        'yes',
        'no',
        '1',
        '0'
    ].includes(str);
}
exports.isBoolean = isBoolean;
;
function parse(str) {
    let r = false;
    switch (str) {
        case 'yes':
            r = true;
            break;
        case 'no':
            r = false;
            break;
        case 'true':
            r = true;
            break;
        case '1':
            r = true;
            break;
        case '0':
            r = false;
            break;
    }
    ;
    return r;
}
exports.parse = parse;
;
exports.default = {
    isBoolean,
    parse
};
//# sourceMappingURL=isBoolean.js.map