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
	run: (d: any): void => {
		let cmd = d.lappy.cmds.default.find((cmd: any) => cmd.names.includes(d.args.get(0)));
		if (!cmd)
			return d.lappy.sendError(d, d.msg, 'Not Found', `Command ['${d.args.get(0)}'] Not Found`);
		let embeds = d.lappy.makeEmbeds(d, {
			title: ('help -> ' + cmd.names[0]).toTitleCase(),
			fields: [{
				name: 'Name/Alias', 
				value: cmd.names.join(', ').toTitleCase().toCodeBlock()
			}]
		});
		if (cmd.desc) {
			embeds[0].addField('Description', '**' + cmd.desc + '**')
		};
		if (cmd.parsedFields) {
			embeds[0].addField('Usage', (cmd.names[0] + ' ' + cmd.parsedFields).toTitleCase().toCodeBlock());
		};
		if (cmd.fields) {
			embeds[0].addField('Fields', cmd.fields.map((field: any) => `${field.name.concat(field.req ? '' : '?')} -> ${field.type}`).join('\n').toTitleCase().toCodeBlock());
		};
		if (cmd.dev) {
			embeds[0].addField('Important!', 'This Command Can Only Be Executed By My Developers'.toCodeBlock());
		};
		return d.msg.reply({ embeds });
  }
};