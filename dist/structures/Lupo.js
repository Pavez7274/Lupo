"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(e, t, s, o) {
        void 0 === o && (o = s), Object.defineProperty(e, o, {
            enumerable: !0,
            get: function() {
                return t[s]
            }
        })
    } : function(e, t, s, o) {
        e[o = void 0 === o ? s : o] = t[s]
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
            for (var s in e) "default" !== s && Object.prototype.hasOwnProperty.call(e, s) && __createBinding(t, e, s);
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
    yt_dlp_1 = require("@distube/yt-dlp"),
    util = __importStar(require("../util/index")),
    BCPlugin_1 = require("./BCPlugin"),
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
        spotify: "<:spotify:1010667806980833312>",
        facha: "<:lappyfacha:902410117826351154>",
        death: "<:lappydeath:902410489458475068>",
        food: "<:lappyfood:913295896899383306>"
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
    datas = {
        unloadedCommands: []
    };
    constructor() {
        super({
            allowedMentions: {
                repliedUser: !1,
                parse: ["roles"]
            },
            presence: {
                status: "dnd",
                activities: [{
                    name: "* Kaede Studio :: version " + require(process.cwd() + "/package.json").version,
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
                    plugins: [new soundcloud_1.SoundCloudPlugin, new spotify_1.SpotifyPlugin({
                        emitEventsAfterFetching: !0
                    }), new BCPlugin_1.BandcampPlugin, new yt_dlp_1.YtDlpPlugin],
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
                value: ["788869971073040454", "878235498055864382", "311194088567341077"]
            }
        })
    }
    commands() {
        let e = require("spinnies"),
            t = new e,
            s = 0,
            o = 0;
        return t.add("cmds", {
            text: "Loading Commands..."
        }), (0, glob_1.sync)(process.cwd() + "/dist/cmds/**/*.js").forEach(async e => {
            e && require.cache[e] && delete require.cache[e];
            let t = require(e);
            (t = "default" in t ? t.default : t).type ||= "default", t.mod = e, "fields" in t && (t.parsedFields = t.fields.map(e => e.req ? `<${e.name}>` : `[${e.name}]`).join(" ")), this.cmds[t.type] || (this.cmds[t.type] = new discord_js_1.Collection);
            try {
                this.cmds[t.type].set(t.names[0] ?? "unknown", t), this.util.generateCommandDoc(t), s++
            } catch (t) {
                this.datas.unloadedCommands.push(e, t), o++
            }
        }), t.succeed("cmds", {
            text: `Loaded ${s} Commands And Failed To Load ${o} Commands.`
        }), this
    }
    events() {
        return console.log(`[${"Lupo".color("red")} -> ${"Events".color("yellow")}] ` + "Running".color("green")), (0, glob_1.sync)(process.cwd() + "/dist/events/**/*.js").forEach(async e => {
            try {
                e && require.cache[e] && delete require.cache[e];
                let t = require(e);
                "dsc" === (t = "default" in t ? t.default : t).type ? (this.removeAllListeners(t.name), this?.[t.once ? "once" : "on"](t.name, (...e) => t.run(this, ...e))) : (this?.[t.type]?.removeAllListeners(t.name), this?.[t.type]?.[t.once ? "once" : "on"](t.name, (...e) => t.run(this, ...e))), console.log(`	[${"Lupo".color("red")} -> ${"Events".color("yellow")}] ${"Loaded".color("green")} ` + (t.name ?? "unknown").color("blue"))
            } catch (e) {
                console.log(e)
            }
        }), this
    }
    start(e = process.env?.DISCORD_TOKEN || process.env.LUPO_TOKEN) {
        return console.log(`┌────────────────────────────────────────┐
├[31m ╔╗  [0m───────── [31m╔══╦╗  [0m─── [31m╔╗  [0m──────────┤
├[31m ║║  [0m───────── [31m║╔╗║║  [0m── [31m╔╝╚╗  [0m─────────┤
├[31m ║║ ╔╗╔╦══╦══╗ ║║╚╣║╔╦═╦═╩╗╔╝  [0m─────────┤
├[31m ║║╔╣║║║╔╗║╔╗║ ║║╔╣║╠╣═║╔╗║║  [0m──────────┤
├[31m ║╚╝║╚╝║╚╝║╚╝║ ║╚╝║╚╣║═╣║║║╚╗  [0m─────────┤
├[31m ╚══╩══╣╔═╩══╝ ╚══╩═╩╩═╩╝╚╩═╝  [0m─────────┤
├────── [31m║║ [34m𝚃𝚢𝚙𝚎𝚂𝚌𝚛𝚒𝚙𝚝 𝙳𝚒𝚜𝚌𝚘𝚛𝚍𝙹𝚂 𝙲𝚕𝚒𝚎𝚗𝚝  [0m─┤
├────── [31m╚╝ [34m𝙱𝚢 𝙺𝚊𝚎𝚍𝚎 𝚂𝚝𝚞𝚍𝚒𝚘  [0m─────────────┤
└────────────────────────────────────────┘`), this.db.connect(), this.events().commands().login(e), setTimeout(() => this.isReady() || console.log("[31mCould not start client[0m") || process.kill(1), 2e4), this
    }
    async permsError(e, t, s, o = e.author) {
        return !e.target && o && (e.target = o), o = this.makeEmbeds(e, {
            title: this.emotes.error + " | [Error] -> Missing Permissions",
            description: `Member/User: ${o?.toString()||"unknown"}
Permissions:
${s.join(", ").toCodeBlock()}
`
        }), t?.["reply" in t ? "reply" : "send"]({
            embeds: o
        })
    }
    async sendError(e, t, s, o, r = e.author, n = [], i = " ") {
        return e.target = r, r = this.makeEmbeds(e, {
            title: this.emotes.error + " | [Error] " + (s ? " -> " + s.toTitleCase() : ""),
            description: o?.toCodeBlock() ?? "```js\nFailed To Display Error```"
        }), t?.["reply" in t ? "reply" : "send"]({
            embeds: r,
            components: n,
            content: i,
            ephemeral: e.ephemeral
        })
    }
    makeEmbeds(o, ...e) {
        const r = [];
        return e.forEach((e, t) => {
            const s = new discord_js_1.EmbedBuilder(e);
            !s.data.thumbnail && o.target && s.setThumbnail(o.target?.displayAvatarURL()), s.data.color || s.setColor("Blurple"), r.push(s.toJSON())
        }), r
    }
}
exports.Lupo = Lupo;