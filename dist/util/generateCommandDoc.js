"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommandDoc = void 0;
const fs_1 = require("fs");
function generateCommandDoc(cmd) {
    let str = new Array();
    str.push(`# ${cmd.names[0]?.toTitleCase()}`);
    cmd.names.length > 1 &&
        str.push(`> ${cmd.names.slice(1).join(', ').toTitleCase()}`);
    str.push('');
    str.push((cmd.desc ?? 'this command does not yet have a description').toTitleCase());
    str.push('');
    if ('fields' in cmd && cmd.fields.length != 0) {
        str.push('## Fields');
        str.push('');
        str.push('| Name | Type | Required |');
        str.push('|------|------|----------|');
        for (let field of cmd.fields) {
            str.push(`| ${field.name.toTitleCase()} | ${field.type.toTitleCase()} | ${field.req ? 'Yes' : 'No'} |`);
        }
        ;
        str.push('');
    }
    ;
    str.push('## Command Usage');
    str.push(`?${cmd.names[0]} ${cmd.parsedFields ?? ''}`.toCodeBlock());
    (0, fs_1.writeFileSync)(`${process.cwd()}/docs/${cmd.names[0]}.md`, str.join('\n'));
}
exports.generateCommandDoc = generateCommandDoc;
;
exports.default = generateCommandDoc;
//# sourceMappingURL=generateCommandDoc.js.map