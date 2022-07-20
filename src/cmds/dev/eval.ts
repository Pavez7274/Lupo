// imports
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, Message, SnowflakeUtil } from 'discord.js';
import { Data } from '../../../types/data';
import { transpile } from 'typescript';
import { compile } from 'coffeescript';
import is from '../../util/inspect';
import { minify } from 'uglify-js'; 
import { inspect } from 'util';

// exports
export const names = [
	'coffee',
	'eval',
	'js',
	'ts', 
	'bash'
];
export const dev = 1;
export const desc = 'evaluate javascript, typescript, coffeescript or bash code via `eval()`, `typescript.transpile()`, `coffee.compile()` or `child_process.execSync()`';
export const type = 'default';
export const fields = [{
	name: 'code',
	type: 'string', 
	req: true 
}];
export async function run (d: Data): Promise<Message | void> {
	// definitions
  let start = Date.now(),
      asynchorus = 0,
      compiled = [false, 'JavaScript'],
      evaled: any = '',
      depth = 0,
      code: any;
	// checks whether to do an asynchronous run
  d.args.get(0)?.toLowerCase() === 'async' &&
		(asynchorus = 1) &&
		d.args.args.shift();
	try {
		// checks whether it should be compiled or not
		if (d.args.endIsTrue('(javascript|js)') || d.cmd === 'js') {
			code = d.args.string();
		} else if (d.args.endIsTrue('(coffee|cs)') || d.cmd === 'coffee') {
			code = compile(d.args.string());
			compiled = [true, 'CoffeeScript'];
		} else if (d.args.endIsTrue('(bash|exec)') || ['bash', 'exec'].includes(d.cmd)) {
			code = `require('child_process').execSync('${d.args.string()}').toString()`;
			compiled = [false, 'Bash'];
		} else {
			code = transpile(d.args.string());
			compiled = [true, 'TypeScript'];
		};
		code = await minify(code)?.code ?? code;
		// evaluates the code uwu
		evaled = await eval(asynchorus ? `(async (d) => {${code}} )(d)` : code);
  } catch (_err: any) {
		// uhhh, there's a lot here but... summary, sends a message in case of error
		let button_0 = new ButtonBuilder()
			.setLabel('View Stack')
			.setStyle(4)
			.setCustomId(String(SnowflakeUtil.generate())),
			button_1 = new ButtonBuilder()
			.setLabel('View Transpiled/Compiled')
			.setStyle(4)
			.setCustomId(String(SnowflakeUtil.generate()))
			.setDisabled(!compiled[0]),
        row_0 = new ActionRowBuilder().setComponents(button_0, button_1),
        msg_0 = await d.lappy.sendError(d, d.msg, _err?.name, _err?.message, void 0, [row_0.toJSON() as any]);
		msg_0.createMessageComponentCollector({
			filter: (i: ButtonInteraction) => [(button_0.data as any).custom_id, (button_1.data as any).custom_id].includes(i.customId),
			componentType: 2 as any,
			time: 6e4
		})
			.on('collect', (i: ButtonInteraction) => {
				i.reply({
					content: (i.customId === (button_0.data as any).custom_id ? _err?.stack?.toCodeBlock('bash') || 'Failed To Display Error' : code.toCodeBlock('js')),
					ephemeral: true
     		})
			})
			.on('end', () => {
				button_0.setDisabled(true);
				button_1.setDisabled(true);
				row_0.setComponents(button_0, button_1);
				msg_0.edit({ components: [row_0.toJSON() as any] });
			});
		return;
	};
	// util information uwu
	let typeof_0 = typeof evaled,
		typeof_1 = is(evaled), 
		result = evaled;
	// This fragment of code will make that if the return (evaled) is not a string convert it into one through the inspect method
	if (typeof_0 !== 'string') {
		result = typeof_0 === 'function' ? evaled.toString() : inspect(evaled, { depth });
	};
	if (evaled && typeof_1 === 'date') {
		const time = Math.floor(Number(evaled)/1000);
		result = `<t:${time}>\n\`${evaled}\``;
	} else {
		// limits the length of the return
		if (result.length > 1000) {
			result = result
				.slice(0, 1000).concat('\n...');
		};
		result = `${result}`.toCodeBlock('js');
	};
	if (code.length > 1000) {
		code = code
			.slice(0, 1000).concat('\n...');
	};
	// makes the embed
	if (d.args.endIsFalse('embed')) {
		return d.msg.reply(result ?? 'unknown');
	} else {
		const embeds = d.lappy.makeEmbeds(d, {
			title: `${d.lappy.emotes.tofu} | Eval -> ${compiled[1]}`, 
			fields: [{
				name: '✉️ | code provided', 
				value: code.toCodeBlock('js')
			}, {
				name: '📃 | answer', 
				value: result ?? '```ts\nunknown```' 
			}, {
				name: '📖 | extra', 
				value: `**[ Type ]** -> \`${typeof_1}\`\n**[ Time ]** -> \`${Date.now() - start ?? 0}Ms\``
			}]
		});
		/*embeds[0]
			.addField(':incoming_envelope: | Input', code.toCodeBlock('js'))
			.addField(':page_facing_up: | Output', result ?? 'unknown')
			.addField(':card_box: | Type', typeof_1.toCodeBlock('js'))
			.addField(':stopwatch: | Execution time', (Date.now() - start + 'Ms').toCodeBlock('js'));*/
		return await d.msg.reply({ embeds });
	};
};