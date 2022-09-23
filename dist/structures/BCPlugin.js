"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(t, e, r, a) {
        void 0 === a && (a = r), Object.defineProperty(t, a, {
            enumerable: !0,
            get: function() {
                return e[r]
            }
        })
    } : function(t, e, r, a) {
        t[a = void 0 === a ? r : a] = e[r]
    }),
    __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(t, e) {
        Object.defineProperty(t, "default", {
            enumerable: !0,
            value: e
        })
    } : function(t, e) {
        t.default = e
    }),
    __importStar = this && this.__importStar || function(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var r in t) "default" !== r && Object.prototype.hasOwnProperty.call(t, r) && __createBinding(e, t, r);
        return __setModuleDefault(e, t), e
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BandcampPlugin = void 0;
const distube_1 = require("distube"),
    parser = __importStar(require("bandcamp-scraper/lib/htmlParser")),
    axios = __importStar(require("axios"));
class BandcampPlugin extends distube_1.CustomPlugin {
    constructor() {
        super()
    }
    async validate(t) {
        if ("string" != typeof t || !t.includes(".bandcamp.com/track/")) return !1;
        try {
            var e = await axios.get(t);
            return !(!e || !e.data)
        } catch {
            return !1
        }
    }
    async play(t, e, r) {
        var a = parser.parseTrackInfo((await axios.get(e)).data, e);
        if (!(e = (await this.distube.search(e.split(/\/\//g)[1].split(".")[0] + " " + a.title))?.at(0))) throw new distube_1.DisTubeError("BANDCAMP_PLUGIN_NO_RESULT", `Couldn't find "${a.title}" on YouTube`);
        await this.distube.play(t, e, r)
    }
}
exports.BandcampPlugin = BandcampPlugin;