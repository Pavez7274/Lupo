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
String.prototype.OwOIfy = function () {
    return this
        .replace(/(?:r|l)/g, 'w')
        .replace(/(?:R|L)/g, 'W')
        .replace(/n[aeiou]/g, 'ny')
        .replace(/N([AEIOUaeiou])/g, 'Ny$1')
        .replace(/nd(?= |&)/g, 'ndo')
        .replace(/you/g, 'uu')
        .replace(/YOU/g, 'uu')
        .replace(/pavez/gi, 'usewess');
};
//# sourceMappingURL=protos.js.map