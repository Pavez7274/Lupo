// imports
import { Client, Collection, User, ActionRow, EmbedBuilder, Message, GatewayIntentBits, APIEmbed } from 'discord.js';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';
import * as util from '../util/index';
import { BandcampPlugin } from './BCPlugin';
import Spotify from 'spotify-finder';
import { DB } from './DataBase';
import { Neko } from './Neko'; 
import { sync } from 'glob';
import DS from 'distube';


// exports
export class Lupo extends Client {
	[index: string]: any;
	emotes = {
		error: '<:lappyAaa:913295794151501864>',
		feli: '<:lappyfeli:913295978205966338>',
		tofu: '<:lappytofu:902410429601570866>', 
		keyboard: '<:bunnykeyboard:998811876974678017>', 
		luv: '<:lappyluv:1001149497012924446>',
		spotify: '<:spotify:1010667806980833312>',
		facha : '<:lappyfacha:902410117826351154>',
		death: '<:lappydeath:902410489458475068>',
		food: '<:lappyfood:913295896899383306>',
	};
	spotify = new Spotify({
		consumer: {
			secret: process.env.spotify_secret,
			key: process.env.spotify_key
		}
	});
	neko = new Neko({ client: this });
	util = util;
	datas = {
		unloadedCommands: []
	};
	constructor () {
		super({
			allowedMentions: {
				repliedUser: false, 
				parse: [ 'roles' ]
			},
			presence: {
				status: 'dnd',
				activities: [{
					name: '* Kaede Studio :: version ' + require(process.cwd() + '/package.json').version,
					type: 0
				}],
			},
			intents: [
				GatewayIntentBits.Guilds, 
				GatewayIntentBits.GuildMembers, 
				GatewayIntentBits.GuildVoiceStates, 
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildPresences, 
				GatewayIntentBits.MessageContent
			]
		});
		Object.defineProperties(this, {
			db: {
				value: new DB({
					tables: [{ name: 'main' }, { name: 'snipe' }],
					path: './db/'
				}, 'main')
			},
			music: {
				value: new DS(this, {
					plugins: [
						new SoundCloudPlugin(),
						new SpotifyPlugin({
							emitEventsAfterFetching: true
						}), 
						new BandcampPlugin(), 
						new YtDlpPlugin()
					],
					nsfw: true
				})
			},
			cache: {
				value: new Collection()
			},
			cmds: {
				value: new Object()
			},
			owners: {
				value: [
					'788869971073040454', // Pavez
					'878235498055864382', // zLexus
					'311194088567341077' // riata
				]
			}
		});
	};

	public commands (): Lupo {
		let S = require('spinnies'), spinners = new S(), loaded = 0, unloaded = 0;
		spinners.add('cmds', { text: 'Loading Commands...' });
		sync(`${process.cwd()}/dist/cmds/**/*.js`).forEach(async (mod: string) => {
			if (mod && require.cache[mod]) {
				delete require.cache[mod];
			};
			let cmd = require(mod);
			if ('default' in cmd) {
				cmd = cmd.default;
			};
			cmd.type ||= 'default';
			cmd.mod = mod;
			if ('fields' in cmd) {
				cmd.parsedFields = cmd.fields.map((field: any) => field.req ? `<${field.name}>` : `[${field.name}]`).join(' ');
			};
			if (!this.cmds[cmd.type]) {
				this.cmds[cmd.type] = new Collection();
			};
			try {
				this.cmds[cmd.type].set(cmd.names[0] ?? 'unknown', cmd);
				this.util.generateCommandDoc(cmd);
				loaded++
			} catch (error) {
				this.datas.unloadedCommands.push(mod, error);
				unloaded++;
			};
		});
		spinners.succeed('cmds', { text: `Loaded ${loaded} Commands And Failed To Load ${unloaded} Commands.` });
		return this;
	};

	public events (): Lupo {
		console.log(`[${
			'Lupo'.color('red')
		} -> ${
			'Events'.color('yellow')
		}] ${
			'Running'.color('green')
		}`);
		sync(`${process.cwd()}/dist/events/**/*.js`).forEach(async (mod: string): Promise<void> => {
      try {
				if (mod && require.cache[mod]) {
					delete require.cache[mod];
				};
				let ev = require(mod);
				if ('default' in ev) {
					ev = ev.default;
				};
				if (ev.type === 'dsc') {
					this.removeAllListeners(ev.name);
					this?.[ev.once ? 'once' : 'on'](ev.name, (...args: any) => ev.run(this, ...args));
				} else {
					this?.[ev.type]?.removeAllListeners(ev.name);
					this?.[ev.type]?.[ev.once ? 'once' : 'on'](ev.name, (...args: any) => ev.run(this, ...args));
				};
				console.log(`	[${
					'Lupo'.color('red')
				} -> ${
					'Events'.color('yellow')
				}] ${
					'Loaded'.color('green')
				} ${
					(ev.name ?? 'unknown').color('blue')
				}`);
			} catch (_err) {
				console.log(_err);
			};
		});
		return this;
	};

	public start (token: string = process.env?.DISCORD_TOKEN || process.env.LUPO_TOKEN): Lupo {
		console.log(`┌────────────────────────────────────────┐
├\x1b[31m ╔╗  \x1b[0m───────── \x1b[31m╔══╦╗  \x1b[0m─── \x1b[31m╔╗  \x1b[0m──────────┤
├\x1b[31m ║║  \x1b[0m───────── \x1b[31m║╔╗║║  \x1b[0m── \x1b[31m╔╝╚╗  \x1b[0m─────────┤
├\x1b[31m ║║ ╔╗╔╦══╦══╗ ║║╚╣║╔╦═╦═╩╗╔╝  \x1b[0m─────────┤
├\x1b[31m ║║╔╣║║║╔╗║╔╗║ ║║╔╣║╠╣═║╔╗║║  \x1b[0m──────────┤
├\x1b[31m ║╚╝║╚╝║╚╝║╚╝║ ║╚╝║╚╣║═╣║║║╚╗  \x1b[0m─────────┤
├\x1b[31m ╚══╩══╣╔═╩══╝ ╚══╩═╩╩═╩╝╚╩═╝  \x1b[0m─────────┤
├────── \x1b[31m║║ \x1b[34m𝚃𝚢𝚙𝚎𝚂𝚌𝚛𝚒𝚙𝚝 𝙳𝚒𝚜𝚌𝚘𝚛𝚍𝙹𝚂 𝙲𝚕𝚒𝚎𝚗𝚝  \x1b[0m─┤
├────── \x1b[31m╚╝ \x1b[34m𝙱𝚢 𝙺𝚊𝚎𝚍𝚎 𝚂𝚝𝚞𝚍𝚒𝚘  \x1b[0m─────────────┤
└────────────────────────────────────────┘`)
		this.db.connect();
		this
			.events()
			.commands()
			/*.on('debug', (str: string) => {
				console.log(
					str
					.replace(/(\[.*?\]|\w+)/gim, (arg: string) => {
						if (['(', '[', '<'].includes(arg.at(0)) && [')', ']', '>'].includes(arg.at(-1)))
							return arg.color('red');
						return arg.color(isNaN(arg as number) ? 'blue' : 'yellow');
					})
				);
			})*/
			.login(token);
		setTimeout(() => this.isReady() || console.log('\x1b[31mCould not start client\x1b[0m'), 2e4);
		return this;
	};

	public async permsError (data: any, instance: any, perms: string[], target: User = data.author): Message {
		const embeds = this.makeEmbeds({ target, ...data }, {
			title: `${this.emotes.error} | [Error] -> Missing Permissions`,
			description: `Member/User: ${target?.toString() || 'unknown'}\nPermissions:\n${perms.join(', ').toCodeBlock()}\n`
		});
    return instance?.['reply' in instance ? 'reply' : 'send']({ embeds });
  };
	
	public async sendError (data: any, instance: any, type: string | undefined, msg: string | undefined, target: User = data.author, components: ActionRow<any>[] | void[] = [], content: string = ' '): Promise<Message> {
		const embeds = this.makeEmbeds({ target, ...data } , {
      title: `${this.emotes.error} | [Error] ${ type ? ` -> ${type.toTitleCase()}` : '' }`,
      description: msg?.toCodeBlock() ?? '```js\nFailed To Display Error```',
    });
    return instance?.['reply' in instance ? 'reply' : 'send']({ embeds, components, content, ephemeral: data!.ephemeral });
  };
	
	public makeEmbeds (data: any, ...embeds: APIEmbed[] | object[]): APIEmbed[] {
		const Embeds: any = [];
		embeds.forEach((options: object, index: number) => {
			// if (index > 5) return;
			const embed = new EmbedBuilder(options);
			if (!embed.data.thumbnail && data.target) {
				embed.setThumbnail(data.target?.displayAvatarURL());
			};
			!embed.data.color && embed.setColor('Blurple');
			Embeds.push(embed.toJSON());
		});
		return Embeds;
	};
}; 