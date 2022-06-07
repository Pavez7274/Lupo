import { SoundCloudPlugin } from '@distube/soundcloud';
import { SpotifyPlugin } from '@distube/spotify';
import { Client, Collection } from 'discord.js';
import { Database } from 'dbdjs.db';
import NC from 'nekos.life';
import { sync } from 'glob';
import DS from 'distube';

enum emotes {
	error = '<:lappyAaa:913295794151501864>'
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
				value: new Database({
					tables: [{ name: 'main' }, { name: 'snipe' }],
					path: './db/'
				})
			},
			music: {
				value: new DS(this, {
					plugins: [
						new SoundCloudPlugin(),
						new SpotifyPlugin()
					],
					leaveOnFinish: !1,
					leaveOnEmpty: !1,
					leaveOnStop: !1,
					searchSongs: 5,
					nsfw: !0
				})
			},
			nekos: {
				value: new NC()
			},
			cache: {
				value: new Collection()
			},
			cmds: {
				value: new Object()
			},
			emotes: {
				value: emotes
			}
		});
	};

	public commands (): Lupo {
		sync(`${process.cwd()}/dist/cmds/**/*.js`).forEach(async (mod: string) => {
			if (mod && require.cache[mod]) {
				delete require.cache[mod];
			};
			const cmd = require(mod);
			cmd.parsedFields = cmd.fields.map((field: any) => field.req ? `<${field.name}>` : `[${field.name}]`);
			if (!this.cmds[cmd.type]) {
				this.cmds[cmd.type] = new Collection();
			};
			this.cmds[cmd.type]
				.set(cmd.names[0] ?? 'unknown', cmd)
				.then(() => console.log(`* [handler] :: loaded command '${cmd.names[0]}'`))
				.catch((error: any) => console.log(`* [handler] :: failed to load command '${cmd.names[0]}' because ${error}`));
		});
		return this;
	};

	public events (): Lupo {
        this.removeAllListeners();
        sync(`${process.cwd()}/dist/events/**/*.js`).forEach(async (mod: string): Promise<void> => {
            try {
                if (mod && require.cache[mod]) {
									delete require.cache[mod];
								};
                let { type, name, run } = require(mod);
                !type && (type = 'dsc');
                if (type === 'dsc')
                    this.on(name, (...args: any) => run(this, ...args));
                else
                    this?.[type]?.on(name, (...args: any) => run(this, ...args));
                console.log(`* [handler] :: loaded event ${name} on ${type}`);
            } catch (_err) {
                console.log(_err);
            };
        });
        return this;
    };

	public start (): Lupo {
		this.commands().events().login();
		return this;
	};
};