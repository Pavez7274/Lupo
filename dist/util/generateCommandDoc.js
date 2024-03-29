"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.generateCommandDoc = void 0;
const fs_1 = require("fs");

function generateCommandDoc(e) {
    let s = new Array;
    if (s.push("# " + e.names[0]?.toTitleCase()), 1 < e.names.length && s.push("> " + e.names.slice(1).join(", ").toTitleCase()), s.push(""), s.push((e.desc ?? "this command does not yet have a description").toTitleCase()), s.push(""), "fields" in e && 0 != e.fields.length) {
        s.push("## Fields"), s.push(""), s.push("| Name | Type | Required |"), s.push("|------|------|----------|");
        for (var o of e.fields) s.push(`| ${o.name.toTitleCase()} | ${o.type} | ${o.req?"Yes":"No"} |`);
        s.push("")
    }
    s.push("## Command Usage"), s.push((`?${e.names[0]} ` + (e.parsedFields ?? "")).toCodeBlock()), (0, fs_1.writeFileSync)(`${process.cwd()}/docs/${e.names[0]}.md`, s.join("\n"))
}
exports.generateCommandDoc = generateCommandDoc, exports.default = generateCommandDoc;