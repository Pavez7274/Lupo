"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(t, e, a, r) {
        void 0 === r && (r = a), Object.defineProperty(t, r, {
            enumerable: !0,
            get: function() {
                return e[a]
            }
        })
    } : function(t, e, a, r) {
        t[r = void 0 === r ? a : r] = e[a]
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
            for (var a in t) "default" !== a && Object.prototype.hasOwnProperty.call(t, a) && __createBinding(e, t, a);
        return __setModuleDefault(e, t), e
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BandcampPlugin = void 0;
const distube_1 = require("distube"),
    parser = __importStar(require("bandcamp-scraper/lib/htmlParser")),
    axios = __importStar(require("axios"));

function IDontHaveANameForThis(t, e) {
    let a;
    try {
        a = parser.parseTrackInfo(t, e)
    } catch {}
    try {
        a = parser.parseAlbumInfo(t, e)
    } catch {}
    try {
        a = parser.parseArtistInfo(t, e)
    } catch {}
    return a && Object.values(a).some(t => Boolean(Array.isArray(t) ? t.length : t))
}
class BandcampPlugin extends distube_1.CustomPlugin {
    constructor() {
        super()
    }
    async validate(t) {
        if ("string" != typeof t || !/http(s|):\/\/\w+\.bandcamp\.com/gi.test(t)) return !1;
        try {
            var e = await axios.get(t);
            return !(!e || !e.data) && IDontHaveANameForThis(e.data, t)
        } catch {
            return !1
        }
    }
    async play(e, a, r) {
        var i = a.split("/").at(3);
        if ("track" == i) {
            var s = parser.parseTrackInfo((await axios.get(a)).data, a);
            let t = (await this.distube.search(a.split(/\/\//g)[1].split(".")[0] + " " + s.title))?.at(0);
            if (!t) throw new distube_1.DisTubeError("BANDCAMP_PLUGIN_NO_RESULT", `Couldn't find "${s.title}" on YouTube`);
            t.source = "bandcamp", await this.distube.play(e, t, r)
        } else if ("album" == i) {
            var n, {
                    member: u,
                    metadata: o
                } = r,
                l = parser.parseAlbumInfo((await axios.get(a)).data, a);
            let t = [];
            for (n of l.tracks) {
                var c = (await this.distube.search(n.name + " " + l.artist, {
                    limit: 1
                })).at(0);
                c && (c = new distube_1.Song(c, {
                    member: u,
                    metadata: o
                }), t.push(c))
            }
            s = {
                thumbnail: l.imageUrl,
                source: "bandcamp",
                name: l.name,
                url: l.url,
                songs: t,
                member: u
            }, i = new distube_1.Playlist(s, {
                member: u,
                metadata: o
            }), this.distube.play(e, i, r)
        } else {
            const {} = r, t = parser.parseArtistInfo((await axios.get(a)).data, a);
            t.albums.map(async t => {
                this.play(e, t.url, r)
            })
        }
    }
}
exports.BandcampPlugin = BandcampPlugin;