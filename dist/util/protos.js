"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.colors = exports.faces = void 0;
const discord_js_1 = require("discord.js"),
    random_1 = require("./random");
String.prototype.toTitleCase = function() {
    return this.replace(/\w\S{1,}/gim, e => e.toLowerCase().replace(e[0].toLowerCase(), e[0].toUpperCase()))
}, String.prototype.toCodeBlock = function(e = "") {
    return `\`\`\`${e}
${(0,discord_js_1.escapeCodeBlock)(this)}
\`\`\``
}, exports.faces = ["uwu", "owo", ">w<", "^w^", "uvu", "ovo", ">v<", "7w7", "7v7", "TwT", "TvT"], String.prototype.OwOIfy = function() {
    return this.replace(/([Ll])ove/g, "$1uv").replace(/LOVE/g, "WUV").replace(/cat/g, "kitteh").replace(/CAT/g, "KITTEH").replace(/(do)(g)/g, "$1$2$2o").replace(/(DO)(G)/g, "$1$2$2O").replace(/(?:r|l)/g, "w").replace(/(?:R|L)/g, "W").replace(/(n)([aeiou])/g, "$1y$2").replace(/N([AEIOU])/g, "NY$1").replace(/nd(?= |&)/g, "ndo").replace(/you/g, "uu").replace(/YOU/g, "UU").replace(/pavez/gi, "usewess").replace(/(d)(e)a(d)/gi, "$1$2$3").replace(/th([Aa])([Tt])/g, "d$1$2").replace(/T[Hh]([Aa])([Tt])/g, "D$1$2").replace(/([Dd]ick|[Pp]enis)/g, "peepee").replace(/(DICK|PENIS)/g, "PEEPEE").replace(/[Tt]h(?![Ee])/g, "f").replace(/TH(?![Ee])/g, "F").replace(/[.,](?![0-9])/g, " " + exports.faces.random()).replace(/[!;]+/g, " " + exports.faces.random())
}, String.prototype.cropAt = function(e) {
    return this.length > e ? this.slice(0, e + 3).concat("...") : this
}, exports.colors = {
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35
}, String.prototype.color = function(e) {
    return `[0m[${Number(e)?Number(e):exports.colors[e]}m${this}[0m`
}, Array.prototype.random = function() {
    return this[(0, random_1.random)(this.length - 1)]
}, Array.prototype.addAt = function(e, ...r) {
    return this.splice(e, 0, ...r)
};