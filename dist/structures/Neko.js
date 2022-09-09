"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neko = void 0;
const axios = __importStar(require("axios"));
;
;
;
class Neko {
    __opts__;
    baseURL;
    client;
    axios = axios;
    imgs = [
        'baka', 'bite', 'blush',
        'bored', 'cry', 'cuddle',
        'dance', 'facepalm', 'feed',
        'handhold', 'happy', 'highfive',
        'hug', 'kick', 'kiss',
        'laugh', 'pat', 'poke',
        'pout', 'punch', 'shoot',
        'shrug', 'slap', 'sleep',
        'smile', 'smug', 'stare',
        'think', 'thumbsup', 'tickle',
        'wave', 'wink', 'yeet'
    ];
    constructor(options) {
        this.__opts__ = options;
        this.baseURL = options.baseURL ?? 'https://nekos.best/api/v2/';
        this.client = options.client;
    }
    ;
    async get(path) {
        return (await this.axios.get(this.baseURL.concat(encodeURIComponent(path))))?.data ?? {};
    }
    ;
    async img(nya) {
        return (await this.get(this.imgs?.[nya] ?? nya))?.results[0];
    }
    ;
}
exports.Neko = Neko;
;
//# sourceMappingURL=Neko.js.map