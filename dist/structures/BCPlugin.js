"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(e, a, t, r) {
        void 0 === r && (r = t), Object.defineProperty(e, r, {
            enumerable: !0,
            get: function() {
                return a[t]
            }
        })
    } : function(e, a, t, r) {
        e[r = void 0 === r ? t : r] = a[t]
    }),
    __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(e, a) {
        Object.defineProperty(e, "default", {
            enumerable: !0,
            value: a
        })
    } : function(e, a) {
        e.default = a
    }),
    __importStar = this && this.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var a = {};
        if (null != e)
            for (var t in e) "default" !== t && Object.prototype.hasOwnProperty.call(e, t) && __createBinding(a, e, t);
        return __setModuleDefault(a, e), a
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BandcampPlugin = void 0;
const distube_1 = require("distube"),
    parser = __importStar(require("bandcamp-scraper/lib/htmlParser")),
    axios = __importStar(require("axios"));

function IDontHaveANameForThis(e, a) {
    let t;
    try {
        t = parser.parseTrackInfo(e, a)
    } catch {}
    try {
        t = parser.parseAlbumInfo(e, a)
    } catch {}
    try {
        t = parser.parseArtistInfo(e, a)
    } catch {}
    return t && Object.values(t).some(e => Boolean(Array.isArray(e) ? e.length : e))
}
class BandcampPlugin extends distube_1.CustomPlugin {
    constructor() {
        super()
    }
    async validate(e) {
        if ("string" != typeof e || !/http(s|):\/\/\w+\.bandcamp\.com/gi.test(e)) return !1;
        try {
            var a = await axios.get(e);
            return !(!a || !a.data) && !!IDontHaveANameForThis(a.data, e)
        } catch {
            return !1
        }
    }
    async play(a, t, r) {
        var i = t.split("/").at(3);
        if ("track" == i) {
            var s = parser.parseTrackInfo((await axios.get(t)).data, t);
            let e = (await this.distube.search(t.split(/\/\//g)[1].split(".")[0] + " " + s.title))?.at(0);
            if (!e) throw new distube_1.DisTubeError("BANDCAMP_PLUGIN_NO_RESULT", `Couldn't find "${s.title}" on YouTube`);
            e.source = "bandcamp", await this.distube.play(a, e, r)
        } else if ("album" == i) {
            var n, {
                    member: u,
                    metadata: o
                } = r,
                l = parser.parseAlbumInfo((await axios.get(t)).data, t);
            let e = [];
            for (n of l.tracks) {
                var m = (await this.distube.search(n.name + " " + l.artist, {
                    limit: 1
                })).at(0);
                m && (m = new distube_1.Song(m, {
                    member: u,
                    metadata: o
                }), e.push(m))
            }
            s = {
                thumbnail: l.imageUrl,
                source: "bandcamp",
                name: l.name,
                url: l.url,
                songs: e,
                member: u
            }, i = new distube_1.Playlist(s, {
                member: u,
                metadata: o
            }), this.distube.play(a, i, r)
        } else {
            const {
                member: c,
                metadata: d
            } = r, p = parser.parseArtistInfo((await axios.get(t)).data, t);
            for (let t = 0; t < p.albums.length; t++) {
                let e = await axios.get(p.albums[t].url),
                    a = parser.parseAlbumInfo(e.data, p.albums[t].url);
                a = a.map(e => e.name + " " + p.name), p.albums[t] = a
            }
            s = p.albums.reduce((e, a) => e.concat(a)).map(async e => (await this.distube.search(e, {
                limit: 1
            })).at(0)).filter(e => Boolean(e)).map(e => new distube_1.Song(e, {
                member: c,
                metadata: d
            })), i = {
                thumbnail: p.coverImage,
                source: "bandcamp",
                name: "Discography of " + p.name,
                url: p.url,
                member: c,
                songs: s
            }, t = new distube_1.Playlist(i, {
                member: c,
                metadata: d
            }), this.distube.play(a, t, r)
        }
    }
}
exports.BandcampPlugin = BandcampPlugin;