"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colors = exports.faces = void 0;
const discord_js_1 = require("discord.js");
const random_1 = require("./random");
String.prototype.insensitiveIncludes = function (match, fromIndex) {
    return this.toLowerCase().includes(match.toLowerCase(), fromIndex);
};
String.prototype.toTitleCase = function () {
    return this.replace(/\w\S{1,}/gim, (word) => word.toLowerCase().replace(word[0].toLowerCase(), word[0].toUpperCase()));
};
String.prototype.toCodeBlock = function (lang = '') {
    return `\`\`\`${lang}\n${(0, discord_js_1.escapeCodeBlock)(this)}\n\`\`\``;
};
exports.faces = [
    'uwu',
    'owo',
    '>w<',
    '^w^',
    'uvu',
    'ovo',
    '>v<',
    '7w7',
    '7v7',
    'TwT',
    'TvT'
];
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
        .replace(/TH(?![Ee])/g, 'F')
        .replace(/[.,](?![0-9])/g, ' ' + exports.faces.random())
        .replace(/[!;]+/g, ' ' + exports.faces.random());
};
String.prototype.cropAt = function (at) {
    return (this.length > at ? this.slice(0, at - 3).concat('...') : this);
};
exports.colors = {
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35
};
String.prototype.color = function (color) {
    return `\x1b[0m\x1b[${Number(color) ? Number(color) : exports.colors[color]}m${this}\x1b[0m`;
};
Array.prototype.random = function () {
    return this[(0, random_1.random)(this.length - 1)];
};
Array.prototype.addAt = function (position, ...items) {
    return this.splice(position, 0, ...items);
};
Array.prototype.chunk = function (limit) {
    for (var size = Math.ceil(this.length / limit), chunks = [], index = 0; index < size; index++)
        chunks[index] = this.splice(0, limit);
    return chunks;
};
//# sourceMappingURL=protos.js.map