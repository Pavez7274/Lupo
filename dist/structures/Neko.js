"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(e, t, i, s) {
        void 0 === s && (s = i), Object.defineProperty(e, s, {
            enumerable: !0,
            get: function() {
                return t[i]
            }
        })
    } : function(e, t, i, s) {
        e[s = void 0 === s ? i : s] = t[i]
    }),
    __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(e, t) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: t
        })
    } : function(e, t) {
        e.default = t
    }),
    __importStar = this && this.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) "default" !== i && Object.prototype.hasOwnProperty.call(e, i) && __createBinding(t, e, i);
        return __setModuleDefault(t, e), t
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Neko = void 0;
const axios = __importStar(require("axios"));
class Neko {
    __opts__;
    baseURL;
    client;
    axios = axios;
    imgs = ["baka", "bite", "blush", "bored", "cry", "cuddle", "dance", "facepalm", "feed", "handhold", "happy", "highfive", "hug", "kick", "kiss", "laugh", "pat", "poke", "pout", "punch", "shoot", "shrug", "slap", "sleep", "smile", "smug", "stare", "think", "thumbsup", "tickle", "wave", "wink", "yeet"];
    constructor(e) {
        this.__opts__ = e, this.baseURL = e.baseURL ?? "https://nekos.best/api/v2/", this.client = e.client
    }
    async get(e) {
        return (await this.axios.get(this.baseURL.concat(encodeURIComponent(e))))?.data ?? {}
    }
    async img(e) {
        return (await this.get(this.imgs?.[e] ?? e))?.results[0]
    }
}
exports.Neko = Neko;