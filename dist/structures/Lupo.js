"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lupo = void 0;
const discord_js_1 = require("discord.js");
const soundcloud_1 = require("@distube/soundcloud");
const spotify_1 = require("@distube/spotify");
const dbdjs_db_1 = require("dbdjs.db");
const nekos_life_1 = __importDefault(require("nekos.life"));
const glob_1 = require("glob");
const distube_1 = __importDefault(require("distube"));
var emotes;
(function (emotes) {
    emotes["error"] = "<:lappyAaa:913295794151501864>";
})(emotes || (emotes = {}));
;
class Lupo extends discord_js_1.Client {
    constructor() {
        super({
            allowedMentions: {
                repliedUser: false
            },
            presence: {
                status: 'dnd',
                activities: [{
                        name: '* Naoki Solutions :: New Source',
                        type: 0
                    }],
            },
            intents: [
                1 << 0,
                1 << 1,
                1 << 7,
                1 << 9
            ]
        });
        Object.defineProperties(this, {
            db: {
                value: new dbdjs_db_1.Database({
                    tables: [{ name: 'main' }, { name: 'snipe' }],
                    path: './db/'
                })
            },
            music: {
                value: new distube_1.default(this, {
                    plugins: [
                        new soundcloud_1.SoundCloudPlugin(),
                        new spotify_1.SpotifyPlugin()
                    ],
                    leaveOnFinish: !1,
                    leaveOnEmpty: !1,
                    leaveOnStop: !1,
                    searchSongs: 5,
                    nsfw: !0
                })
            },
            nekos: {
                value: new nekos_life_1.default()
            },
            cache: {
                value: new discord_js_1.Collection()
            },
            cmds: {
                value: new Object()
            },
            emotes: {
                value: emotes
            }
        });
    }
    ;
    commands() {
        (0, glob_1.sync)(`${process.cwd()}/dist/cmds/**/*.js`).forEach(async (mod) => {
            if (mod && require.cache[mod]) {
                delete require.cache[mod];
            }
            ;
            const cmd = require(mod);
            cmd.parsedFields = cmd.fields.map((field) => field.req ? `<${field.name}>` : `[${field.name}]`);
            if (!this.cmds[cmd.type]) {
                this.cmds[cmd.type] = new discord_js_1.Collection();
            }
            ;
            this.cmds[cmd.type]
                .set(cmd.names[0] ?? 'unknown', cmd)
                .then(() => console.log(`* [handler] :: loaded command '${cmd.names[0]}'`))
                .catch((error) => console.log(`* [handler] :: failed to load command '${cmd.names[0]}' because ${error}`));
        });
        return this;
    }
    ;
    events() {
        this.removeAllListeners();
        (0, glob_1.sync)(`${process.cwd()}/dist/events/**/*.js`).forEach(async (mod) => {
            try {
                if (mod && require.cache[mod]) {
                    delete require.cache[mod];
                }
                ;
                let event = require(mod);
                if (event.default) {
                    let { name, type, run, once } = event.default;
                }
                else {
                    let { name, type, run, once } = event;
                }
                ;
                if (type === 'dsc') {
                    thi?.[once ? 'once' : 'on'](name, (...args) => run(this, ...args));
                }
                else {
                    this?.[type]?.[once ? 'once' : 'on'](name, (...args) => run(this, ...args));
                }
                ;
            }
            catch (_err) {
                console.log(_err);
            }
            ;
        });
        return this;
    }
    ;
    start() {
        this.commands().events().login();
        return this;
    }
    ;
    permsError(data, instance, perms, target = data.author) {
        if (!data.target && target) {
            data.target = target;
        }
        ;
        const embeds = this.makeEmbeds(data, {
            title: `${this.emotes.error} | [Error] -> Missing Permissions`,
            description: `Member/User: ${target?.toString() || 'unknown'}\nPermissions:\n${perms.join(', ').toCodeBlock()}\n`
        });
        if (instance.reply)
            return instance.reply({ embeds });
        return instance.send({ embeds });
    }
    ;
    sendError(data, instance, type, msg, target = data.author, components = [], content = ' ') {
        const embeds = this.makeEmbeds(data, {
            title: `${this.emotes.error} | [Error] ${type ? ` -> ${type}` : ''}`,
            description: msg?.toCodeBlock() || '```js\nFailed To Display Error```',
        });
        if (instance.reply)
            return instance.reply({ embeds, components, content });
        return instance.send({ embeds });
    }
    ;
    makeEmbeds(data, ...embeds) {
        const embeds_0 = new Array();
        embeds.forEach((options, index) => {
            if (index > 5)
                return;
            const embed = new discord_js_1.MessageEmbed(options);
            if (!embed.thumbnail && data.target) {
                embed.setThumbnail(data.target?.displayAvatarURL());
            }
            ;
            !embed.color && embed.setColor('BLURPLE');
            embeds_0.push(embed);
        });
        return embeds_0;
    }
    ;
}
exports.Lupo = Lupo;
;
//# sourceMappingURL=Lupo.js.map