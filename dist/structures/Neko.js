"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(e, t, i, a) {
        void 0 === a && (a = i), Object.defineProperty(e, a, {
            enumerable: !0,
            get: function() {
                return t[i]
            }
        })
    } : function(e, t, i, a) {
        e[a = void 0 === a ? i : a] = t[i]
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
    imgs = ["smug", "woof", "gasm", "8ball", "goose", "cuddle", "avatar", "slap", "v3", "pat", "gecg", "feed", "fox_girl", "lizard", "neko", "hug", "meow", "kiss", "wallpaper", "tickle", "spank", "waifu", "lewd", "ngif"];
    constructor(e) {
        this.__opts__ = e, this.baseURL = e.baseURL ?? "http://pavez.glitch.me/neko/", this.client = e.client
    }
    async get(e) {
        return (await this.axios.get(this.baseURL.concat(encodeURIComponent(e))))?.data ?? {}
    }
    async img(e) {
        return this.get("v2/img/" + e)
    }
}
exports.Neko = Neko;