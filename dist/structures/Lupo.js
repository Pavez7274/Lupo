"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(e, t, o, s) {
        void 0 === s && (s = o), Object.defineProperty(e, s, {
            enumerable: !0,
            get: function() {
                return t[o]
            }
        })
    } : function(e, t, o, s) {
        e[s = void 0 === s ? o : s] = t[o]
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
            for (var o in e) "default" !== o && Object.prototype.hasOwnProperty.call(e, o) && __createBinding(t, e, o);
        return __setModuleDefault(t, e), t
    },
    __importDefault = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Lupo = void 0;
const discord_js_1 = require("discord.js"),
    soundcloud_1 = require("@distube/soundcloud"),
    spotify_1 = require("@distube/spotify"),
    util = __importStar(require("../util/index")),
    spotify_finder_1 = __importDefault(require("spotify-finder")),
    DataBase_1 = require("./DataBase"),
    Neko_1 = require("./Neko"),
    glob_1 = require("glob"),
    distube_1 = __importDefault(require("distube"));
class Lupo extends discord_js_1.Client {
    emotes = {
        error: "<:lappyAaa:913295794151501864>",
        feli: "<:lappyfeli:913295978205966338>",
        tofu: "<:lappytofu:902410429601570866>",
        keyboard: "<:bunnykeyboard:998811876974678017>",
        luv: "<:lappyluv:1001149497012924446>",
        spotify: "<:spotify:1010667806980833312>"
    };
    spotify = new spotify_finder_1.default({
        consumer: {
            secret: process.env.spotify_secret,
            key: process.env.spotify_key
        }
    });
    neko = new Neko_1.Neko({
        client: this
    });
    util = util;
    constructor() {
        super({
            allowedMentions: {
                repliedUser: !1,
                parse: ["roles"]
            },
            presence: {
                status: "dnd",
                activities: [{
                    name: "* No Dev Studios Jaja :: version " + require(process.cwd() + "/package.json").version,
                    type: 0
                }]
            },
            intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMembers, discord_js_1.GatewayIntentBits.GuildVoiceStates, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.GuildPresences, discord_js_1.GatewayIntentBits.MessageContent]
        }), Object.defineProperties(this, {
            db: {
                value: new DataBase_1.DB({
                    tables: [{
                        name: "main"
                    }, {
                        name: "snipe"
                    }],
                    path: "./db/"
                }, "main")
            },
            music: {
                value: new distube_1.default(this, {
                    plugins: [new soundcloud_1.SoundCloudPlugin, new spotify_1.SpotifyPlugin],
                    leaveOnFinish: !1,
                    leaveOnEmpty: !1,
                    leaveOnStop: !1,
                    searchSongs: 5,
                    nsfw: !0
                })
            },
            cache: {
                value: new discord_js_1.Collection
            },
            cmds: {
                value: new Object
            },
            owners: {
                value: ["788869971073040454", "878235498055864382"]
            }
        })
    }
    commands() {
        return console.log(`* [${"handler".color("red")}] :: ${"Running".color("green")} -> ` + "Commands".color("blue")), (0, glob_1.sync)(process.cwd() + "/dist/cmds/**/*.js").forEach(async e => {
            e && require.cache[e] && delete require.cache[e];
            let t = require(e);
            (t = "default" in t ? t.default : t).type ||= "default", "fields" in t && (t.parsedFields = t.fields.map(e => e.req ? `<${e.name}>` : `[${e.name}]`).join(" ")), this.cmds[t.type] || (this.cmds[t.type] = new discord_js_1.Collection);
            try {
                this.cmds[t.type].set(t.names[0] ?? "unknown", t), this.util.generateCommandDoc(t), console.log(`* [${"handler".color("red")}] :: ${"loaded".color("green")} command '${(t.names[0]??"unknown").color("blue")}'`)
            } catch (e) {
                console.log((`* [handler] :: failed to load command '${t.names[0]??"unknown"}' because ` + e).color("red"))
            }
        }), this
    }
    events() {
        return console.log(`* [${"handler".color("red")}] :: ${"Running".color("green")} -> ` + "Events".color("blue")), (0, glob_1.sync)(process.cwd() + "/dist/events/**/*.js").forEach(async e => {
            try {
                e && require.cache[e] && delete require.cache[e];
                let t = require(e);
                "dsc" === (t = "default" in t ? t.default : t).type ? this?.[t.once ? "once" : "on"](t.name, (...e) => t.run(this, ...e)) : this?.[t.type]?.[t.once ? "once" : "on"](t.name, (...e) => t.run(this, ...e)), console.log(`* [${"handler".color("red")}] :: ${"loaded".color("green")} event '${(t.name??"unknown").color("blue")}'`)
            } catch (e) {
                console.log(e)
            }
        }), this
    }
    start() {
        return this.db.connect(), this.events().commands().on("debug", e => {
            e.includes("429") && console.log('Please run in the shell "kill 1"'.color("red"))
        }).login(), this
    }
    permsError(e, t, o, s = e.author) {
        return !e.target && s && (e.target = s), s = this.makeEmbeds(e, {
            title: this.emotes.error + " | [Error] -> Missing Permissions",
            description: `Member/User: ${s?.toString()||"unknown"}
Permissions:
${o.join(", ").toCodeBlock()}
`
        }), t.reply ? t.reply({
            embeds: s
        }) : t.send({
            embeds: s
        })
    }
    sendError(e, t, o, s, r = e.author, n = [], i = " ") {
        return e.target = r, r = this.makeEmbeds(e, {
            title: this.emotes.error + " | [Error] " + (o ? " -> " + o.toTitleCase() : ""),
            description: s?.toTitleCase()?.toCodeBlock() || "```js\nFailed To Display Error```"
        }), t.reply ? t.reply({
            embeds: r,
            components: n,
            content: i
        }) : t.send({
            embeds: r
        })
    }
    makeEmbeds(s, ...e) {
        const r = [];
        return e.forEach((e, t) => {
            if (!(5 < t)) {
                const o = new discord_js_1.EmbedBuilder(e);
                !o.data.thumbnail && s.target && o.setThumbnail(s.target?.displayAvatarURL()), o.data.color || o.setColor("Blurple"), r.push(o.toJSON())
            }
        }), r
    }
}
exports.Lupo = Lupo;