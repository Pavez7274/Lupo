"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
String.prototype.toTitleCase = function (sep = ' ') {
    return this
        .split(sep)
        .map((word) => word.toLowerCase().replace(word[0].toLowerCase(), word[0].toUpperCase()))
        .join(sep);
};
String.prototype.toCodeBlock = function (lang = '') {
    return `\`\`\`${lang}\n${discord_js_1.Util.escapeCodeBlock(this)}\n\`\`\``;
};
//# sourceMappingURL=protos.js.map