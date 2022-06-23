"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const random_1 = require("./random");
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
        .replace(/([Ll])ove/g, '$1uv')
        .replace(/LOVE/g, 'WUV')
        .replace(/cat/g, 'kitteh')
        .replace(/CAT/g, 'KITTEH')
        .replace(/(do)(g)/g, '$1$2$2o')
        .replace(/(DO)(G)/g, '$1$2$2O')
        .replace(/(?:r|l)/g, 'w')
        .replace(/(?:R|L)/g, 'W')
        .replace(/(n)([aeiou])/g, '$1y$2')
        .replace(/N([AEIOU])/g, 'NY$1')
        .replace(/nd(?= |&)/g, 'ndo')
        .replace(/you/g, 'uu')
        .replace(/YOU/g, 'UU')
        .replace(/pavez/gi, 'usewess')
        .replace(/(d)(e)a(d)/gi, '$1$2$3')
        .replace(/th([Aa])([Tt])/g, 'd$1$2')
        .replace(/T[Hh]([Aa])([Tt])/g, 'D$1$2')
        .replace(/([Dd]ick|[Pp]enis)/g, 'peepee')
        .replace(/(DICK|PENIS)/g, 'PEEPEE')
        .replace(/[Tt]h(?![Ee])/g, 'f')
        .replace(/TH(?![Ee])/g, 'F');
};
Array.prototype.random = function () {
    return this[(0, random_1.random)(this.length - 1)];
};
//# sourceMappingURL=protos.js.map