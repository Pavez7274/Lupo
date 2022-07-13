import { Client, Collection, User, MessageActionRow, MessageEmbed, Message } from 'discord.js';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { SpotifyPlugin } from '@distube/spotify';
import { generateCommandDoc } from '../util/generateCommandDoc';
import { DB } from './DataBase';
import { sync } from 'glob';
import DS from 'distube';

enum emotes {
	error = '<:lappyAaa:913295794151501864>',
	feli = '<:lappyfeli:913295978205966338>',
	tofu = '<:lappytofu:902410429601570866>',
};

export class Lupo extends Client {
	[index: string]: any;
	constructor () {
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
				1 << 0, // GUILDS
				1 << 1, // GUILD_MEMBERS
				1 << 7, // GUILD_VOICE_STATES
				1 << 9 // GUILD_MESSAGES
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
						new SpotifyPlugin()
					],
					leaveOnFinish: false,
					leaveOnEmpty: false,
					leaveOnStop: false,
					searchSongs: 5,
					nsfw: true,
					youtubeDL: false
				})
			},
			cache: {
				value: new Collection()
			},
			cmds: {
				value: new Object()
			},
			emotes: {
				value: emotes
			},
			owners: {
				value: [
					'788869971073040454', // Pavez
					'878235498055864382', // zLexus
				]
			}
		});
	};

	public commands (): Lupo {
		console.log('* [handler] :: Running -> Commands');
		sync(`${process.cwd()}/dist/cmds/**/*.js`).forEach(async (mod: string) => {
			if (mod && require.cache[mod]) {
				delete require.cache[mod];
			};
			let cmd = require(mod);
			if ('default' in cmd) {
				cmd = cmd.default;
			};
			if (!('type' in cmd)) {
				cmd.type = 'default';
			};
			if ('fields' in cmd) {
				cmd.parsedFields = cmd.fields.map((field: any) => field.req ? `<${field.name}>` : `[${field.name}]`).join(' ');
			};
			if (!this.cmds[cmd.type]) {
				this.cmds[cmd.type] = new Collection();
			};
			try {
				this.cmds[cmd.type].set(cmd.names[0] ?? 'unknown', cmd);
				console.log(`* [handler] :: loaded command '${cmd.names[0] ?? 'unknown'}'`);
				generateCommandDoc(cmd);
			} catch (error) {
				console.log(`* [handler] :: failed to load command '${cmd.names[0] ?? 'unknown'}' because ${error}`);
			}
		});
		return this;
	};

	public events (): Lupo {
		console.log('* [handler] :: Running -> Events');
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
					this?.[ev.once ? 'once' : 'on'](ev.name, (...args: any) => ev.run(this, ...args));
				} else {
					this?.[ev.type]?.[ev.once ? 'once' : 'on'](ev.name, (...args: any) => ev.run(this, ...args));
				};
				console.log(`* [handler] :: loaded event '${ev.name ?? 'unknown'}'`);
			} catch (_err) {
				console.log(_err);
			};
		});
		return this;
	};

	public start (): Lupo {
		this.db.connect();
		this
			.events()
			.commands()
			.on('debug', (msg: string) => {
				if (msg.includes('Hit a 429'))
					console.log('%c Please run in the shell "kill 1"', 'color: #C00');
			})
			.login();
		return this;
	};

	public permsError (data: any, instance: any, perms: Array<string>, target: User = data.author): Message {
		if (!data.target && target) {
			data.target = target;
		};
		const embeds = this.makeEmbeds(data, {
			title: `${this.emotes.error} | [Error] -> Missing Permissions`,
			description: `Member/User: ${target?.toString() || 'unknown'}\nPermissions:\n${perms.join(', ').toCodeBlock()}\n`
		});
    if (instance.reply)
      return instance.reply({ embeds });
    return instance.send({ embeds });
  };
	
	public sendError (data: any, instance: any, type: string | undefined, msg: string | undefined, target: User = data.author, components: Array<MessageActionRow | void> = [], content: string = ' '): Message {
		data.target = target;
    const embeds = this.makeEmbeds(data, {
      title: `${this.emotes.error} | [Error] ${ type ? ` -> ${type}` : '' }`,
      description: msg?.toCodeBlock() || '```js\nFailed To Display Error```',
    });
    if (instance.reply)
      return instance.reply({ embeds, components, content });
    return instance.send({ embeds });
  };
	
	public makeEmbeds (data: any, ...embeds: Array<object>): Array<MessageEmbed> {
		const embeds_0 = new Array();
		embeds.forEach((options: object, index: number) => {
			if (index > 5) return;
			const embed = new MessageEmbed(options);
			if (!embed.thumbnail && data.target) {
				embed.setThumbnail(data.target?.displayAvatarURL());
			};
			!embed.color && embed.setColor('BLURPLE');
			embeds_0.push(embed);
		});
		return embeds_0;
	};
}; 