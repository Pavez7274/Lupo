// imports
import { Data } from '../../../types/data';
const Table = require('ascii-table');

// definitions 
const table = new Table()
	.removeBorder();

// exports 
export default {
	names: [
		'help'
	],
	fields: [{
		name: 'command',
		type: 'string',
		req: false
	}],
	desc: 'get help on a specific command',
	type: 'default',
	run: (d: Data): any => {
		let cmds = d.lappy.cmds.default
			.map(({ names }) => names[0])
			.sort((a: string, b: string) => a.localeCompare(b)),
			array = [];
		for (let i = 0; i < cmds.length; i += 2) {
			let idk = [];
			cmds[i] && idk.push(cmds[i]);
			cmds[++i] && idk.push(cmds[i]);
			cmds[++i] && idk.push(cmds[i]);
			array.push(idk);
		};
		table.addRowMatrix(array);
		if (d.args.ends.includes('--all')) {
			let embeds = d.lappy.makeEmbeds(d, {
				title: `${d.lappy.emotes.feli} | help -> All Commands`,
				description: table
					.toString()
					.split('\n')
					.map(a => a.trim())
					.join('\n')
					.cropAt(4000)
					.toCodeBlock()
			});
			return d.msg.reply({ embeds });
		};
		if (d.args.len === 0) {
			return d.lappy.sendError(d, d.msg, 'Field', `Field 1 ['command'] Cannot Be Empty`);
		};
		let cmd = d.lappy.cmds.default.find((cmd: any) => cmd.names.includes(d.args.get(0)));
		if (!cmd)
			return d.lappy.sendError(d, d.msg, 'Not Found', `Command ['${d.args.get(0)}'] Not Found`);
		let embeds = d.lappy.makeEmbeds(d, {
			title: (`${d.lappy.emotes.tofu} | help -> ${cmd.names[0]}`).toTitleCase(),
			fields: [{
				name: 'Name/Alias',
				value: cmd.names.join(', ').toTitleCase().toCodeBlock(),
				fields: []
			}]
		});
		if (cmd.desc) {
			embeds[0].fields?.push({
				name: 'Description',
				value: ('**' + cmd.desc + '**').toTitleCase()
			});
		};
		if (cmd.parsedFields) {
			embeds[0].fields?.push({
				name: 'Usage',
				value: (cmd.names[0] + ' ' + cmd.parsedFields).toTitleCase().toCodeBlock()
			});
		};
		if (cmd.fields) {
			embeds[0].fields?.push({
				name: 'Fields',
				value: cmd.fields.map((field: any) => `${field.name.concat(field.req ? '' : '?')} -> ${field.type}`).join('\n').toTitleCase().toCodeBlock()
			});
		};
		if (cmd.dev) {
			embeds[0].fields?.push({
				name: 'Important!',
				value: 'This Command Can Only Be Executed By My Developers'.toCodeBlock()
			});
		};
		return d.msg.reply({ embeds });
	}
};