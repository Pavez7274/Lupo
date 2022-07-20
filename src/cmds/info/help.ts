import { Data } from '../../../types/data';

export default {
	names: [
		'help'
	],
	fields: [{
		name: 'command', 
		type: 'string', 
		req: true
	}], 
	type: 'default',
	run: (d: Data): any => {
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