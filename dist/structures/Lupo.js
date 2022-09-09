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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lupo = void 0;
const discord_js_1 = require("discord.js");
const soundcloud_1 = require("@distube/soundcloud");
const spotify_1 = require("@distube/spotify");
const yt_dlp_1 = require("@distube/yt-dlp");
const util = __importStar(require("../util/index"));
const spotify_finder_1 = __importDefault(require("spotify-finder"));
const DataBase_1 = require("./DataBase");
const Neko_1 = require("./Neko");
const glob_1 = require("glob");
const distube_1 = __importDefault(require("distube"));
class Lupo extends discord_js_1.Client {
    emotes = {
        error: '<:lappyAaa:913295794151501864>',
        feli: '<:lappyfeli:913295978205966338>',
        tofu: '<:lappytofu:902410429601570866>',
        keyboard: '<:bunnykeyboard:998811876974678017>',
        luv: '<:lappyluv:1001149497012924446>',
        spotify: '<:spotify:1010667806980833312>',
        facha: '<:lappyfacha:902410117826351154>',
        death: '<:lappydeath:902410489458475068>',
        food: '<:lappyfood:913295896899383306>',
    };
    spotify = new spotify_finder_1.default({
        consumer: {
            secret: process.env.spotify_secret,
            key: process.env.spotify_key
        }
    });
    neko = new Neko_1.Neko({ client: this });
    util = util;
    datas = {
        unloadedCommands: []
    };
    constructor() {
        super({
            allowedMentions: {
                repliedUser: false,
                parse: ['roles']
            },
            presence: {
                status: 'dnd',
                activities: [{
                        name: '* Kaede Studio :: version ' + require(process.cwd() + '/package.json').version,
                        type: 0
                    }],
            },
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMembers,
                discord_js_1.GatewayIntentBits.GuildVoiceStates,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.GuildPresences,
                discord_js_1.GatewayIntentBits.MessageContent
            ]
        });
        Object.defineProperties(this, {
            db: {
                value: new DataBase_1.DB({
                    tables: [{ name: 'main' }, { name: 'snipe' }],
                    path: './db/'
                }, 'main')
            },
            music: {
                value: new distube_1.default(this, {
                    plugins: [
                        new soundcloud_1.SoundCloudPlugin(),
                        new spotify_1.SpotifyPlugin({
                            emitEventsAfterFetching: true
                        }),
                        new yt_dlp_1.YtDlpPlugin()
                    ],
                    leaveOnFinish: false,
                    leaveOnEmpty: false,
                    leaveOnStop: false,
                    nsfw: true
                })
            },
            cache: {
                value: new discord_js_1.Collection()
            },
            cmds: {
                value: new Object()
            },
            owners: {
                value: [
                    '788869971073040454',
                    '878235498055864382',
                    '311194088567341077'
                ]
            }
        });
    }
    ;
    commands() {
        let S = require('spinnies'), spinners = new S(), loaded = 0, unloaded = 0;
        spinners.add('cmds', { text: 'Loading Commands...' });
        (0, glob_1.sync)(`${process.cwd()}/dist/cmds/**/*.js`).forEach(async (mod) => {
            if (mod && require.cache[mod]) {
                delete require.cache[mod];
            }
            ;
            let cmd = require(mod);
            if ('default' in cmd) {
                cmd = cmd.default;
            }
            ;
            cmd.type ||= 'default';
            cmd.mod = mod;
            if ('fields' in cmd) {
                cmd.parsedFields = cmd.fields.map((field) => field.req ? `<${field.name}>` : `[${field.name}]`).join(' ');
            }
            ;
            if (!this.cmds[cmd.type]) {
                this.cmds[cmd.type] = new discord_js_1.Collection();
            }
            ;
            try {
                this.cmds[cmd.type].set(cmd.names[0] ?? 'unknown', cmd);
                this.util.generateCommandDoc(cmd);
                loaded++;
            }
            catch (error) {
                this.datas.unloadedCommands.push(mod, error);
                unloaded++;
            }
            ;
        });
        spinners.succeed('cmds', { text: `Loaded ${loaded} Commands And Failed To Load ${unloaded} Commands.` });
        return this;
    }
    ;
    events() {
        console.log(`[${'Lupo'.color('red')} -> ${'Events'.color('yellow')}] ${'Running'.color('green')}`);
        (0, glob_1.sync)(`${process.cwd()}/dist/events/**/*.js`).forEach(async (mod) => {
            try {
                if (mod && require.cache[mod]) {
                    delete require.cache[mod];
                }
                ;
                let ev = require(mod);
                if ('default' in ev) {
                    ev = ev.default;
                }
                ;
                if (ev.type === 'dsc') {
                    this.removeAllListeners(ev.name);
                    this?.[ev.once ? 'once' : 'on'](ev.name, (...args) => ev.run(this, ...args));
                }
                else {
                    this?.[ev.type]?.removeAllListeners(ev.name);
                    this?.[ev.type]?.[ev.once ? 'once' : 'on'](ev.name, (...args) => ev.run(this, ...args));
                }
                ;
                console.log(`	[${'Lupo'.color('red')} -> ${'Events'.color('yellow')}] ${'Loaded'.color('green')} ${(ev.name ?? 'unknown').color('blue')}`);
            }
            catch (_err) {
                console.log(_err);
            }
            ;
        });
        return this;
    }
    ;
    start(token = process.env?.DISCORD_TOKEN || process.env.LUPO_TOKEN) {
        console.log(`┌────────────────────────────────────────┐
├\x1b[31m ╔╗  \x1b[0m───────── \x1b[31m╔══╦╗  \x1b[0m─── \x1b[31m╔╗  \x1b[0m──────────┤
├\x1b[31m ║║  \x1b[0m───────── \x1b[31m║╔╗║║  \x1b[0m── \x1b[31m╔╝╚╗  \x1b[0m─────────┤
├\x1b[31m ║║ ╔╗╔╦══╦══╗ ║║╚╣║╔╦═╦═╩╗╔╝  \x1b[0m─────────┤
├\x1b[31m ║║╔╣║║║╔╗║╔╗║ ║║╔╣║╠╣═║╔╗║║  \x1b[0m──────────┤
├\x1b[31m ║╚╝║╚╝║╚╝║╚╝║ ║╚╝║╚╣║═╣║║║╚╗  \x1b[0m─────────┤
├\x1b[31m ╚══╩══╣╔═╩══╝ ╚══╩═╩╩═╩╝╚╩═╝  \x1b[0m─────────┤
├────── \x1b[31m║║ \x1b[34m𝚃𝚢𝚙𝚎𝚂𝚌𝚛𝚒𝚙𝚝 𝙳𝚒𝚜𝚌𝚘𝚛𝚍𝙹𝚂 𝙲𝚕𝚒𝚎𝚗𝚝  \x1b[0m─┤
├────── \x1b[31m╚╝ \x1b[34m𝙱𝚢 𝙺𝚊𝚎𝚍𝚎 𝚂𝚝𝚞𝚍𝚒𝚘  \x1b[0m─────────────┤
└────────────────────────────────────────┘`);
        this.db.connect();
        this
            .events()
            .commands()
            .login(token);
        setTimeout(() => this.isReady() || console.log('\x1b[31mCould not start client\x1b[0m') || process.kill(1), 2e4);
        return this;
    }
    ;
    async permsError(data, instance, perms, target = data.author) {
        if (!data.target && target) {
            data.target = target;
        }
        ;
        const embeds = this.makeEmbeds(data, {
            title: `${this.emotes.error} | [Error] -> Missing Permissions`,
            description: `Member/User: ${target?.toString() || 'unknown'}\nPermissions:\n${perms.join(', ').toCodeBlock()}\n`
        });
        return instance?.['reply' in instance ? 'reply' : 'send']({ embeds });
    }
    ;
    async sendError(data, instance, type, msg, target = data.author, components = [], content = ' ') {
        data.target = target;
        const embeds = this.makeEmbeds(data, {
            title: `${this.emotes.error} | [Error] ${type ? ` -> ${type.toTitleCase()}` : ''}`,
            description: msg?.toCodeBlock() ?? '```js\nFailed To Display Error```',
        });
        return instance?.['reply' in instance ? 'reply' : 'send']({ embeds, components, content, ephemeral: data.ephemeral });
    }
    ;
    makeEmbeds(data, ...embeds) {
        const Embeds = [];
        embeds.forEach((options, index) => {
            const embed = new discord_js_1.EmbedBuilder(options);
            if (!embed.data.thumbnail && data.target) {
                embed.setThumbnail(data.target?.displayAvatarURL());
            }
            ;
            !embed.data.color && embed.setColor('Blurple');
            Embeds.push(embed.toJSON());
        });
        return Embeds;
    }
    ;
}
exports.Lupo = Lupo;
;
//# sourceMappingURL=Lupo.js.map